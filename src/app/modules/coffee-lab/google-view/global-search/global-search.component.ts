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
    isFirstLoading: boolean;
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
    orderList: any[] = [
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
    ];
    translationsList: any[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    categoryList: any;
    tabMenuItems: { label: string; postType: PostType }[] = [];
    rows = 9;
    page = 1;

    get postType(): PostType {
        return this.tabMenuItems[this.selectedTab]?.postType || PostType.QA;
    }

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
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                let page = +params.get('page') || 1;
                if (page < 1) {
                    page = 1;
                }
                if (this.page !== page) {
                    this.page = page;
                    this.getPosts();
                }
            }
        });
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.startupService.load(language);
            if (this.router.url !== `/${getLangRoute(language)}/search?query=${this.keyword}`) {
                this.router.navigate([`/${getLangRoute(language)}/search`], {
                    queryParams: { query: this.keyword },
                });
            }
            this.startSearch();
        });
        this.scrollTop();
    }

    handleSearch(): void {
        this.searchInput$.next(this.keyword);
    }

    clearFilters() {
        this.sortBy = null;
        this.filterBy = null;
        this.isAvailableTranslation = null;
        this.selectedCategory = null;
        this.page = 1;
        this.router.navigate([], { queryParams: { page: this.page }, queryParamsHandling: 'merge' });
    }

    getCategory() {
        const params = {
            language: this.coffeeLabService.currentForumLanguage,
            is_recipe: this.postType === PostType.RECIPE,
        };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    getPosts() {
        const postType = this.tabMenuItems[this.selectedTab]?.postType;
        if (!postType) {
            return;
        }
        const params = {
            query: this.keyword,
            sort_by:
                postType === PostType.QA
                    ? this.sortBy === 'most_answered'
                        ? 'most_answered'
                        : 'posted_at'
                    : 'created_at',
            sort_order:
                postType === PostType.QA
                    ? this.sortBy === 'most_answered'
                        ? 'desc'
                        : this.sortBy === 'latest' || !this.sortBy
                        ? 'desc'
                        : 'asc'
                    : this.selectedOrder === 'latest' || !this.selectedOrder
                    ? 'desc'
                    : 'asc',
            is_consumer: this.filterBy,
            level: this.level?.toLowerCase(),
            translations_available: this.isAvailableTranslation,
            publish: true,
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
        };

        this.isLoading = true;
        this.scrollTop();
        this.coffeeLabService.getForumList(postType, params).subscribe((res: any) => {
            if (res.success) {
                if (postType === PostType.QA) {
                    this.searchResult.questions = res.result.questions;
                    this.searchResult.qa_total_count = res.result_info.total_count || 0;
                } else if (postType === PostType.ARTICLE) {
                    this.searchResult.articles = res.result;
                    this.searchResult.article_total_count = res.result_info.total_count || 0;
                } else if (postType === PostType.RECIPE) {
                    this.searchResult.recipes = res.result;
                    this.searchResult.recipe_total_count = res.result_info.total_count || 0;
                }
            }
            this.isLoading = false;
        });
    }

    startSearch(): void {
        if (!this.keyword) {
            return;
        }
        this.isFirstLoading = true;
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
                this.tabMenuItems.push({ label: 'question_answers', postType: PostType.QA });
            }
            if (this.searchResult.articles.length > 0) {
                this.tabMenuItems.push({ label: 'posts', postType: PostType.ARTICLE });
            }
            if (this.searchResult.recipes.length > 0) {
                this.tabMenuItems.push({ label: 'brewing_guides', postType: PostType.RECIPE });
            }
            this.selectedTab = 0;
            this.clearFilters();
            this.getCategory();
            this.coffeeLabService.searchResult.next(this.searchResult);
            this.isFirstLoading = false;
        });
    }

    onTabChange(event) {
        this.selectedTab = event.index;
        this.clearFilters();
        this.getPosts();
        this.getCategory();
    }

    onClose(): void {
        this.keyword = '';
        const curRouterMap = RouterMap[this.coffeeLabService.currentForumLanguage] || RouterMap.en;
        this.router.navigate([
            `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/${curRouterMap[RouterSlug.QA]}`,
        ]);
    }

    scrollTop() {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }
}
