import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CoffeeLabService, SEOService, StartupService, GlobalsService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';
import { environment } from '@env/environment';
import { RouterMap, seoVariables } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { getLangRoute, toSentenceCase } from '@utils';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {
    readonly PostType = PostType;
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    loading = true;
    jsonLD: any;
    lang: any;
    previousUrl: string;
    answerDetail: any;
    urlLang: string;
    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastrService,
        private seoService: SEOService,
        private startupService: StartupService,
        public globalsService: GlobalsService,
        public dialogSrv: DialogService,
        @Inject(DOCUMENT) private doc,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.urlLang = params?.lang;
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.getDetails();
            }
            if (!this.relatedData?.length) {
                this.getQaList();
            }
        });
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

    getQaList() {
        this.coffeeLabService.getForumList('question', { page: 1, per_page: 4 }).subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result.questions
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 3);
            }
        });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('question', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                if (getLangRoute(res.result.lang_code) !== this.urlLang) {
                    this.router.navigateByUrl('/error');
                } else {
                    this.detailsData = res.result;
                    this.lang = res.result.lang_code;
                    if (this.detailsData.parent_question_id > 0) {
                        this.detailsData.answers.forEach((element) => {
                            if (element.parent_answer_id > 0) {
                                this.getAnswerDetail(element.id);
                            }
                        });
                    }
                    this.globalsService.setLimitCounter();
                    this.startupService.load(this.lang || 'en');
                    this.previousUrl = `/${getLangRoute(this.lang)}/${RouterMap[this.lang][RouterSlug.QA]}`;
                    this.setSEO();
                    this.setSchemaMackup();
                }
            } else {
                this.toastService.error('The question is not exist.');
                this.router.navigate(['/error']);
            }
            this.loading = false;
        });
    }

    getAnswerDetail(id: any) {
        this.coffeeLabService.getForumDetails('answer', id).subscribe((res: any) => {
            this.answerDetail = res.result;
        });
    }

    setSEO() {
        let title: string;
        let description: string;
        const firstAnswer = this.detailsData?.answers[0];
        if (this.detailsData?.question) {
            if (this.detailsData?.question.length < 40) {
                title = this.detailsData?.question.concat(' - Era of We Coffee Marketplace');
            } else {
                title = this.detailsData?.question;
            }
        } else {
            title = this.idOrSlug.replace('-', '').concat(' - Era of We Coffee Marketplace');
        }
        const firstAnswerContent = this.globalsService.getJustText(firstAnswer?.answer);
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
                            item: `${environment.coffeeLabWeb}/${getLangRoute(this.lang)}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Q+A Forum',
                            item: `${environment.coffeeLabWeb}/${getLangRoute(this.lang)}/qa-forum`,
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
                                text: this.globalsService.getJustText(answer.answer),
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
}
