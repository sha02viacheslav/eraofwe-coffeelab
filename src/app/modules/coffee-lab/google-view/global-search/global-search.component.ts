import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { RouterMap, SlugMap } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { CoffeeLabService, ResizeService, StartupService } from '@services';
import { getLangRoute } from '@utils';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent extends ResizeableComponent implements OnInit {
    readonly PostType = PostType;
    isLoading: boolean;
    keyword = '';
    searchResult: any;
    searchInput$: Subject<any> = new Subject<any>();
    selectedTab: any = 0;
    sortBy: any;
    filterBy: any;
    isAvailableTranslation?: any;
    selectedOrder: string;
    selectedRecipeOrder: string;
    isAvailableRecipeTranslation?: any;
    selectedCategory: any;
    level: any;
    levels = [
        { label: 'expertise_easy', value: 'expertise_easy' },
        { label: 'expertise_intermediate', value: 'expertise_intermediate' },
        { label: 'expertise_hard', value: 'expertise_hard' },
    ];
    sortOptions = [
        { label: 'latest', value: 'latest' },
        { label: 'most_answered', value: 'most_answered' },
        { label: 'oldest', value: 'oldest' },
    ];
    filterPostedByOptions = [
        { label: 'coffee_experts', value: false },
        { label: 'coffee_consumer', value: true },
    ];
    translationsList: any[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    categoryList: any;
    tabMenuItems: { label: string; postType: PostType }[] = [];
    rows = 9;
    page = 1;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private route: ActivatedRoute,
        private startupService: StartupService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        const searchQueryParam = this.route.snapshot.queryParamMap.get('query');
        if (searchQueryParam) {
            this.keyword = searchQueryParam;
        }
        this.searchInput$.pipe(debounceTime(1000)).subscribe(() => {
            if (this.keyword) {
                this.router.navigate([], {
                    queryParams: { query: this.keyword },
                    queryParamsHandling: 'merge',
                });
            }
            this.startSearch();
        });
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.startupService.load(language);
            if (this.router.url !== `/${getLangRoute(language)}/search?query=${this.keyword}`) {
                this.router.navigate([`/${getLangRoute(language)}/search`], {
                    queryParams: { query: this.keyword },
                });
            }
            this.startSearch();
        });
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

    handleSearch(): void {
        this.searchInput$.next(this.keyword);
    }

    getCategory(isRecipe: boolean) {
        const params = { language: this.coffeeLabService.currentForumLanguage, is_recipe: isRecipe };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    getArticles() {
        const params = {
            query: this.keyword,
            sort_by: 'created_at',
            translations_available: this.isAvailableTranslation,
            sort_order: 'desc',
            publish: true,
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
        };

        this.coffeeLabService.getForumList(PostType.ARTICLE, params).subscribe((res: any) => {
            if (res.success) {
                this.searchResult.articles = res.result;
            }
        });
    }
    getRecipes() {
        const params = {
            query: this.keyword,
            translations_available: this.isAvailableRecipeTranslation,
            sort_by: 'created_at',
            sort_order: 'desc',
            level: this.level?.toLowerCase(),
            publish: true,
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
        };

        this.coffeeLabService.getForumList(PostType.RECIPE, params).subscribe((res: any) => {
            if (res.success) {
                this.searchResult.articles = res.result;
            }
        });
    }
    getQuestions() {
        const params = {
            query: this.keyword,
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
        };

        this.coffeeLabService.getForumList(PostType.QA, params).subscribe((res: any) => {
            if (res.success) {
                this.searchResult.questions = res.result.questions;
            }
        });
    }

    filterSortBy() {
        const params = {
            query: this.keyword,
            sort_by: 'created_at',
            sort_order:
                this.selectedOrder === 'most_answered'
                    ? 'desc'
                    : this.selectedOrder === 'latest' || !this.selectedOrder
                    ? 'desc'
                    : 'asc',
            publish: true,
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList(this.getSelectedType(), params).subscribe((res: any) => {
            if (res.success) {
                if (this.getSelectedType() === PostType.QA) {
                    this.searchResult.questions = res.result.questions;
                } else if (this.getSelectedType() === PostType.ARTICLE) {
                    this.searchResult.articles = res.result;
                } else if (this.getSelectedType() === PostType.RECIPE) {
                    this.searchResult.recipes = res.result;
                }
            }
        });
    }

    filterCategory() {
        const params = {
            query: this.keyword,
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
        };

        this.coffeeLabService.getForumList(this.getSelectedType(), params).subscribe((res: any) => {
            if (res.success) {
                if (this.getSelectedType() === PostType.QA) {
                    this.searchResult.questions = res.result.questions;
                } else if (this.getSelectedType() === PostType.ARTICLE) {
                    this.searchResult.articles = res.result;
                } else if (this.getSelectedType() === PostType.RECIPE) {
                    this.searchResult.recipes = res.result;
                }
            }
        });
    }

    startSearch(): void {
        if (!this.keyword) {
            return;
        }
        this.isLoading = true;
        const params = {
            query: this.keyword,
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            page: this.page,
            per_page: this.rows,
        };
        forkJoin([
            this.coffeeLabService.getForumList(PostType.QA, params),
            this.coffeeLabService.getForumList(PostType.ARTICLE, params),
            this.coffeeLabService.getForumList(PostType.RECIPE, params),
        ]).subscribe((res: any[]) => {
            const questions = res[0]?.result?.questions || [];
            const articles = res[1]?.result || [];
            const recipes = res[2]?.result || [];
            this.searchResult = {
                questions,
                articles,
                recipes,
                qa_total_count: res[0]?.result_info.total_count || 0,
                article_total_count: res[1]?.result_info.total_count || 0,
                recipe_total_count: res[2]?.result_info.total_count || 0,
            };
            this.tabMenuItems = [];
            if (this.searchResult.questions.length > 0) {
                this.tabMenuItems.push({
                    label: 'question_answers',
                    postType: PostType.QA,
                });
            }
            if (this.searchResult.articles.length > 0) {
                this.tabMenuItems.push({
                    label: 'posts',
                    postType: PostType.ARTICLE,
                });
            }
            if (this.searchResult.recipes.length > 0) {
                this.tabMenuItems.push({
                    label: 'brewing_guides',
                    postType: PostType.RECIPE,
                });
            }
            this.onTabChange({ index: 0 });
            this.coffeeLabService.searchResult.next(this.searchResult);
            this.isLoading = false;
        });
    }

    onTabChange(event) {
        this.selectedTab = event.index;
        this.selectedCategory = null;
        this.searchResult.recipes.length > 0 && this.tabMenuItems.length - 1 === event.index
            ? this.getCategory(true)
            : this.getCategory(false);
    }

    getSelectedType(): string {
        let type: string;
        if (this.selectedTab === 0) {
            if (this.searchResult.questions) {
                type = PostType.QA;
            } else if (this.searchResult.articles) {
                type = PostType.ARTICLE;
            } else if (this.searchResult.recipes) {
                type = PostType.RECIPE;
            }
        } else if (this.selectedTab === 1) {
            if (this.searchResult.articles) {
                type = PostType.ARTICLE;
            } else if (this.searchResult.recipes) {
                type = PostType.RECIPE;
            }
        } else if (this.selectedTab === 2) {
            if (this.searchResult.recipes) {
                type = PostType.RECIPE;
            }
        }
        return type;
    }

    onClose(): void {
        this.keyword = '';
        const curRouterMap = RouterMap[this.coffeeLabService.currentForumLanguage] || RouterMap.en;
        this.router.navigate([
            `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/${curRouterMap[RouterSlug.QA]}`,
        ]);
    }
}
