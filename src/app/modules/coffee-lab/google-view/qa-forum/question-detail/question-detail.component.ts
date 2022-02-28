import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { seoVariables } from '@constants';
import { PostType } from '@enums';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, SEOService, StartupService } from '@services';
import { ConvertToShortDescriptionPipe } from '@shared';
import { getLangRoute, toSentenceCase } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss'],
    providers: [ConvertToShortDescriptionPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionDetailComponent implements OnInit {
    readonly PostType = PostType;
    detailsData: any;
    idOrSlug: string;
    loading = true;
    jsonLD: any;
    lang: any;
    urlLang: string;
    showToaster = false;
    items = [];
    constructor(
        @Inject(DOCUMENT) private doc,
        @Inject(PLATFORM_ID) private platformId: object,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private router: Router,
        private seoService: SEOService,
        private startupService: StartupService,
        private translator: TranslateService,
        private convertToShortDescription: ConvertToShortDescriptionPipe,
    ) {
        this.activatedRoute.parent.parent.params.subscribe((res) => {
            this.urlLang = res.lang;
        });
        this.activatedRoute.params.subscribe((params) => {
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails(PostType.QA, this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                if (getLangRoute(res.result.lang_code) !== this.urlLang) {
                    this.router.navigateByUrl('/error');
                } else {
                    this.detailsData = res.result;
                    this.items = [
                        { label: this.translator.instant('the_coffee_lab'), routerLink: '/' },
                        { label: this.translator.instant('qa_forum'), routerLink: `/${this.urlLang}/qa-forum` },
                        {
                            label: this.convertToShortDescription.transform(this.detailsData.question, 4),
                        },
                    ];
                    this.lang = res.result.lang_code;
                    this.startupService.load(this.lang || 'en');
                    this.getOriginalAnswers();

                    this.setSEO();
                    if (isPlatformServer(this.platformId)) {
                        this.setSchemaMackup();
                    }
                }
            } else {
                this.router.navigateByUrl('/error/post-not-found');
                this.coffeeLabService.postNotFoundCategories.next(res.result.categories);
            }
            this.loading = false;
            this.cdr.detectChanges();
        });
    }

    getOriginalAnswers() {
        const promises = [];
        if (this.detailsData.parent_question_id > 0) {
            this.detailsData.answers.forEach((element, index) => {
                if (element.parent_answer_id > 0) {
                    promises.push(new Promise((resolve) => this.getAnswerDetail(element.id, index, resolve)));
                }
            });
            if (promises.length) {
                Promise.all(promises).then(() => {
                    this.cdr.detectChanges();
                });
            }
        }
    }

    getAnswerDetail(id: any, answerIdx: number, resolve) {
        this.coffeeLabService.getForumDetails(PostType.ANSWER, id).subscribe((res) => {
            if (res.success && res.result?.original_answer_state === 'ACTIVE') {
                this.detailsData.answers[answerIdx].originalAnswer = res.result.original_details;
            }
            resolve();
        });
    }

    setSEO() {
        let title: string;
        let description: string;
        const firstAnswer = this.detailsData?.answers[0];
        if (this.detailsData?.question) {
            title = this.detailsData?.question.concat(' - Era of We Coffee Marketplace');
        } else {
            title = toSentenceCase(this.idOrSlug).concat(' - Era of We Coffee Marketplace');
        }
        const firstAnswerContent = firstAnswer?.answer;
        if (firstAnswerContent) {
            if (firstAnswerContent.length < 100) {
                description = firstAnswerContent.concat(
                    ' - Era of We A global coffee marketplace and community that brings together all members of the supply chain',
                );
            } else {
                description = firstAnswerContent;
            }
        } else {
            description = toSentenceCase(this.idOrSlug).concat(
                ' - Era of We A global coffee marketplace and community that brings together all members of the supply chain',
            );
        }
        const imageUrl = firstAnswer?.images?.[0] || seoVariables.image;

        this.seoService.setSEO(title, description);
    }

    setSchemaMackup() {
        this.jsonLD = {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            name: 'Overview',
                            item: `${environment.coffeeLabWeb}${getLangRoute(this.lang)}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Q+A Forum',
                            item: `${environment.coffeeLabWeb}${getLangRoute(this.lang)}/qa-forum`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 3,
                            name: this.detailsData?.question,
                        },
                    ],
                },
                {
                    '@type': 'QAPage',
                    mainEntity: {
                        '@type': 'Question',
                        name: this.detailsData?.slug,
                        text: this.detailsData?.question,
                        answerCount: this.detailsData?.answers?.length || 0,
                        dateCreated: this.detailsData?.created_at,
                        author: {
                            '@type': 'Person',
                            name: this.detailsData?.user_name,
                        },
                        suggestedAnswer: this.detailsData?.answers.map((answer, index) => {
                            return {
                                '@type': 'Answer',
                                text: answer.answer,
                                dateCreated: answer.created_at,
                                url: `${this.doc.URL}?#answer-${answer.id}`,
                                author: {
                                    '@type': 'Person',
                                    name: answer.user_name,
                                },
                            };
                        }),
                    },
                },
            ],
        };
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }

    getLink(language, slug) {
        return `/${getLangRoute(language)}/qa-forum/${slug}`;
    }

    toastCalled(event) {
        if (event) {
            this.showToaster = true;
        }
    }
}
