import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CoffeeLabService, ResizeService, StartupService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';
import { getLangRoute } from '@utils';
import { ResizeableComponent } from '@base-components';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends ResizeableComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    isLoading = false;
    questions: any[] = [];
    articles: any;
    recipes: any;
    selectedTab = 0;
    slug: string;
    currentCategory: any;
    otherCategories: any[] = [];
    isCategoryCalled = 0;
    currentLangCode: string;
    topWriters: any[] = [];
    filterBy: any;
    isAvailableTranslation?: any;
    selectedOrder = '';
    selectedRecipeOrder = '';
    isAvailableRecipeTranslation?: any;
    page = 1;
    menuItems = [
        {
            label: 'question_answers',
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'posts',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'brewing_guides',
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
    ];
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    filterPostedByOptions = [
        {
            label: 'Coffee experts',
            value: false,
        },
        {
            label: 'End consumers',
            value: true,
        },
    ];
    translationsList: any[] = [];
    sortBy = '';
    rows = 10;
    totalRecords = 0;
    jsonLD: any;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        public coffeeLabService: CoffeeLabService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private toastService: ToastrService,
        private startupService: StartupService,
        protected resizeService: ResizeService,
        private translator: TranslateService,
    ) {
        super(resizeService);
        this.activateRoute.params.subscribe((params) => {
            this.slug = params.category;
            this.currentLangCode = params.lang === 'pt-br' ? 'pt' : params.lang;
            if (this.isCategoryCalled !== 1) {
                this.getCategories(false);
            }
            this.isCategoryCalled++;
        });

        this.activateRoute.queryParamMap.subscribe((queryParams) => {
            if (queryParams.has('page')) {
                this.page = +queryParams.get('page');
                if (this.page < 1) {
                    this.page = 1;
                }
                this.onChangeTab(this.selectedTab);
            }

            if (isPlatformBrowser(this.platformId)) {
                window.scrollTo(0, 0);
            }
        });
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.currentLangCode = language;
            this.startupService.load(language);
            if (this.isCategoryCalled !== 1) {
                this.getCategories(true);
            }
            this.isCategoryCalled++;
        });
        this.getAllTopWriters();
    }

    setMenItems() {
        this.translationsList = [
            {
                label: this.translator.instant('yes'),
                value: true,
            },
            {
                label: this.translator.instant('no'),
                value: false,
            },
        ];
    }

    onChangeTab(index: number) {
        this.selectedTab = index;
        if (this.selectedTab === 0) {
            this.getQuestions();
        } else if (this.selectedTab === 1) {
            this.getArticles();
        } else if (this.selectedTab === 2) {
            this.getRecipes();
        }
        window.scroll(0, 0);
    }

    getCategories(isLangChanged: boolean) {
        this.otherCategories = [];
        this.coffeeLabService.getCategory(this.currentLangCode).subscribe((res) => {
            if (res.success) {
                if (isLangChanged) {
                    const isCategory = res.result.find(
                        (element) => element.parent_id === this.currentCategory?.parent_id,
                    );
                    if (isCategory) {
                        this.router.navigateByUrl(getLangRoute(this.currentLangCode) + '/' + isCategory.slug);
                        this.currentCategory = isCategory;
                        this.slug = this.currentCategory.slug;
                        this.asssignCategories(res.result);
                    } else {
                        this.asssignCategories(res.result);
                    }
                } else {
                    this.asssignCategories(res.result);
                }
            }
        });
    }

    asssignCategories(data: any) {
        this.otherCategories = data.filter((element) => element.slug !== this.slug);
        this.currentCategory = data.find((item) => item.slug === this.slug);
        this.onChangeTab(this.selectedTab);
    }

    getQuestions(): void {
        const params = {
            is_consumer: this.filterBy,
            sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.sortBy === 'most_answered'
                    ? 'desc'
                    : this.sortBy === 'latest' || this.sortBy === ''
                    ? 'desc'
                    : 'asc',
            page: this.page,
            category_slug: this.slug,
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

    getArticles(): void {
        const params = {
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' || this.selectedOrder === '' ? 'desc' : 'asc',
            translations_available: this.isAvailableTranslation,
            publish: true,
            category_slug: this.slug,
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('article', params).subscribe((res) => {
            if (res.success) {
                this.articles = res.result;
                this.totalRecords = res.result_info.total_count;
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    getRecipes(): void {
        const params = {
            sort_by: 'created_at',
            sort_order: this.selectedRecipeOrder === 'latest' || this.selectedRecipeOrder === '' ? 'desc' : 'asc',
            publish: true,
            translations_available: this.isAvailableRecipeTranslation,
            category_slug: this.slug,
            page: 1,
            per_page: 10000,
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('recipe', params).subscribe((res) => {
            if (res.success) {
                this.recipes = res.result;
                this.totalRecords = res.result_info.total_count;
            } else {
                this.toastService.error('Cannot get Recipe data');
            }
            this.isLoading = false;
        });
    }

    getAllTopWriters() {
        this.coffeeLabService.getTopWriters({ count: 4 }).subscribe((res) => {
            if (res.success) {
                this.topWriters = res.result;
            }
        });
    }

    onBack() {
        if (this.selectedTab === 0) {
            this.router.navigateByUrl('coffee-lab/overview/qa-forum');
        } else if (this.selectedTab === 1) {
            this.router.navigateByUrl('coffee-lab/overview/articles');
        } else if (this.selectedTab === 2) {
            this.router.navigateByUrl('coffee-lab/overview/coffee-recipes');
        }
    }

    // paginate(event: any) {
    //     if (this.page !== event.page + 1) {
    //         this.router.navigate([], { queryParams: { page: event.page + 1 } });
    //     }
    // }

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

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
