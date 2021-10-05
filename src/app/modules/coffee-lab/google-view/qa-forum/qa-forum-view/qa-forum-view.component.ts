import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService, SEOService, GlobalsService, ResizeService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ResizeableComponent } from '@base-components';
import { SeoDescription, SeoTitle } from '@constants';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { environment } from '@env/environment';
import { PostType, RouterSlug } from '@enums';
import { getLangRoute } from '@utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-qa-forum-view',
    templateUrl: './qa-forum-view.component.html',
    styleUrls: ['./qa-forum-view.component.scss'],
})
export class QaForumViewComponent extends ResizeableComponent implements OnInit {
    readonly PostType = PostType;
    sortOptions = [];
    filterOptions = [];
    sortBy = '';
    filterBy: any;
    questions: any[] = [];
    isLoading = true;
    keyword = '';
    totalRecords = 0;
    rows = 10;
    page = 1;
    jsonLD: any;
    // buttonList = [{ button: 'Roasting' }, { button: 'Coffee grinding' }, { button: 'Milling' }, { button: 'Brewing' }];

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private globalsService: GlobalsService,
        private route: ActivatedRoute,
        private router: Router,
        private seoService: SEOService,
        private toastService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.setSEO();
        this.filterOptions = [
            {
                label: this.translator.instant('coffee_experts'),
                value: false,
            },
            {
                label: this.translator.instant('coffee_consumer'),
                value: true,
            },
        ];
        this.sortOptions = [
            {
                label: this.translator.instant('latest'),
                value: 'latest',
            },
            {
                label: this.translator.instant('most_answered'),
                value: 'most_answered',
            },
            {
                label: this.translator.instant('oldest'),
                value: 'oldest',
            },
        ];

        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                this.page = +params.get('page');
                if (this.page < 1) {
                    this.page = 1;
                }
            }
            this.getData();
            if (isPlatformBrowser(this.platformId)) {
                window.scrollTo(0, 0);
            }
        });
    }

    getData(): void {
        const params = {
            query: this.keyword,
            is_consumer: this.filterBy,
            sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.sortBy === 'most_answered'
                    ? 'desc'
                    : this.sortBy === 'latest' || this.sortBy === ''
                    ? 'desc'
                    : 'asc',
            page: this.page,
            per_page: this.rows,
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('question', params).subscribe((res: any) => {
            if (res.success) {
                this.questions = res.result?.questions || [];
                this.totalRecords = res.result_info.total_count;
                this.setSchemaMackup();
            } else {
                this.toastService.error('Cannot get forum data');
            }
            this.isLoading = false;
        });
    }

    paginate(event: any) {
        if (this.page !== event.page + 1) {
            this.router.navigate([], { queryParams: { page: event.page + 1 } });
        }
    }

    getLink(item: any, answer: any) {
        const url = `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/qa-forum/${item.slug}`;
        return {
            url,
            queryParmas: {
                answer: answer?.id,
            },
        };
    }

    gotoDetailPage(event, item: any, answer?: any) {
        event.stopPropagation();
        event.preventDefault();
        if (this.globalsService.getLimitCounter() > 0) {
            this.router.navigate([this.getLink(item, answer).url], {
                queryParams: this.getLink(item, answer).queryParmas,
            });
        } else {
            this.dialogSrv.open(SignupModalComponent, { data: { isLimit: true } });
        }
    }

    setSEO() {
        const title = SeoTitle[this.coffeeLabService.currentForumLanguage][RouterSlug.QA];
        const description = SeoDescription[this.coffeeLabService.currentForumLanguage][RouterSlug.QA];
        this.seoService.setSEO(title, description);
    }

    setSchemaMackup() {
        const forumList: any[] = [];
        for (const forum of this.questions) {
            const itemData = {
                '@type': 'QAPage',
                mainEntity: {
                    '@type': 'Question',
                    name: forum.slug,
                    text: forum.question,
                    answerCount: forum.answers?.length || 0,
                    dateCreated: forum.created_at,
                    author: {
                        '@type': 'Person',
                        name: forum.question_user,
                    },
                    suggestedAnswer: forum.answers?.map((answer, index) => {
                        return {
                            '@type': 'Answer',
                            text: answer.answer,
                            dateCreated: answer.created_at,

                            url: `${environment.coffeeLabWeb}/${getLangRoute(
                                this.coffeeLabService.currentForumLanguage,
                            )}/qa-forum/${forum.slug}?#answer-${answer.id}`,
                            author: {
                                '@type': 'Person',
                                name: answer.user_name,
                            },
                        };
                    }),
                },
            };
            forumList.push(itemData);
        }
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
                            item: `${environment.coffeeLabWeb}/${getLangRoute(
                                this.coffeeLabService.currentForumLanguage,
                            )}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Q+A Forums',
                        },
                    ],
                },
                ...forumList,
            ],
        };
    }
}
