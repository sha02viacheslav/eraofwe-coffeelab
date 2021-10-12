import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoffeeLabService, SEOService, ResizeService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ResizeableComponent } from '@base-components';
import { environment } from '@env/environment';
import { PostType } from '@enums';
import { getLangRoute } from '@utils';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

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
    categoryList: any;
    selectedCategory: string;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private coffeeLabService: CoffeeLabService,
        private route: ActivatedRoute,
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
            { label: 'coffee_experts', value: false },
            { label: 'coffee_consumer', value: true },
        ];
        this.sortOptions = [
            { label: 'latest', value: 'latest' },
            { label: 'most_answered', value: 'most_answered' },
            { label: 'oldest', value: 'oldest' },
        ];

        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                this.page = +params.get('page');
                if (this.page < 1) {
                    this.page = 1;
                }
            }
            this.refreshData();
        });
        let langPrefix = '';
        this.route.paramMap.subscribe((params) => {
            if (params.has('lang')) {
                if (langPrefix) {
                    this.refreshData();
                }
                langPrefix = params.get('lang');
            }
        });
    }

    refreshData() {
        this.getData();
        this.getCategory();
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
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
            category_slug: this.selectedCategory,
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

    getCategory() {
        this.coffeeLabService.getCategory(this.coffeeLabService.currentForumLanguage).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    setSEO() {
        this.translator
            .getStreamOnTranslationChange(['tcl_seo_meta_title_qa', 'tcl_seo_meta_description_qa'])
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((res) => {
                this.seoService.setSEO(res.tcl_seo_meta_title_qa, res.tcl_seo_meta_description_qa);
            });
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
