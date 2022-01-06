import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterMap, seoVariables } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { environment } from '@env/environment';
import { CoffeeLabService, GlobalsService, SEOService, StartupService } from '@services';
import { getLangRoute, toSentenceCase } from '@utils';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss'],
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionDetailComponent implements OnInit {
    readonly PostType = PostType;
    detailsData: any;
    idOrSlug: string;
    loading = true;
    jsonLD: any;
    lang: any;
    previousUrl: string;
    urlLang: string;
    showToaster = false;
    constructor(
        @Inject(DOCUMENT) private doc,
        @Inject(PLATFORM_ID) private platformId: object,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private globalsService: GlobalsService,
        private messageService: MessageService,
        private router: Router,
        private seoService: SEOService,
        private startupService: StartupService,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.urlLang = params?.lang;
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
                    this.lang = res.result.lang_code;
                    this.globalsService.setLimitCounter();
                    this.startupService.load(this.lang || 'en');
                    this.previousUrl = `/${getLangRoute(this.lang)}/${
                        (RouterMap[this.lang] || RouterMap.en)[RouterSlug.QA]
                    }`;
                    this.messageService.clear();
                    this.messageService.add({ key: 'translate', severity: 'success', closable: false });
                    this.getOriginalAnswers();

                    this.setSEO();
                    if (isPlatformServer(this.platformId)) {
                        this.setSchemaMackup();
                    }
                }
            } else {
                this.router.navigate(['/error']);
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

    onGoRelatedQuestion(event, item) {
        event.stopPropagation();
        event.preventDefault();
        if (this.globalsService.getLimitCounter() > 0) {
            this.router.navigate([`/${getLangRoute(this.lang)}/qa-forum/${item.slug}`]);
        } else {
            this.dialogSrv.open(SignupModalComponent, { data: { isLimit: true } });
        }
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
