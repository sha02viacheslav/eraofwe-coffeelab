import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterMap } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { CoffeeLabService } from '@services';
import { getLangRoute } from '@utils';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent implements OnInit {
    readonly PostType = PostType;
    isLoading: boolean;
    keyword: string;
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

    constructor(private coffeeLabService: CoffeeLabService, private router: Router, private route: ActivatedRoute) {
        this.searchInput$.pipe(debounceTime(1000)).subscribe(() => {
            if (this.keyword) {
                this.router.navigate([], {
                    queryParams: { query: this.keyword },
                });
            }
            this.startSearch();
        });
        const searchQueryParam = this.route.snapshot.queryParamMap.get('query');
        if (searchQueryParam) {
            this.keyword = searchQueryParam;
            this.startSearch();
        }
    }

    ngOnInit(): void {}

    handleSearch(): void {
        this.searchInput$.next(this.keyword);
        if (!this.keyword) {
            // this.searchResult = [];
            // this.coffeeLabService.searchResult.next(this.searchResult);
            // this.router.navigate([this.handleRoute(this.coffeeLabService.currentForumLanguage).destinationRouter]);
            // this.menuItems = this.getMenuItems(this.coffeeLabService.currentForumLanguage);
        }
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
            page: 1,
            per_page: 10000,
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
            publish: true,
            category_id: this.selectedCategory,
            page: 1,
            per_page: 10000,
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
            page: 1,
            per_page: 10000,
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
            page: 1,
            per_page: 10000,
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
            page: 1,
            per_page: 10000,
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
            page: 1,
            per_page: 10000,
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
                total_count: questions.length + articles.length + recipes.length,
            };
            console.log(this.searchResult);
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
