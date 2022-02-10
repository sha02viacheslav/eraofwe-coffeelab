import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { RouterMap, SlugMap } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { CoffeeLabService, ResizeService, StartupService } from '@services';
import { getLangRoute } from '@utils';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent extends ResizeableComponent implements OnInit {
    menuItems: MenuItem[] = [];
    postType: PostType;
    cuurentRoasterSlug: RouterSlug;
    isGlobalSearchResultPage = false;
    isLoading: boolean;
    keyword: string;

    searchResult: any;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private startupService: StartupService,
        protected resizeService: ResizeService,
        private dialogSrv: DialogService,
        private route: ActivatedRoute,
    ) {
        super(resizeService);

        const searchQueryParam = this.route.snapshot.queryParamMap.get('search');
        if (searchQueryParam) {
            this.keyword = searchQueryParam;
            this.startSearch();
        }
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.menuItems = this.getMenuItems(language);
            this.startupService.load(language);
            let currentRouter = this.router.url;
            if (currentRouter) {
                currentRouter = currentRouter.split('/')[2].split('?')[0];
            }
            const curRouterSlug = SlugMap[currentRouter] || RouterSlug.QA;
            const curRouterMap = RouterMap[language] || RouterMap.en;
            const destinationRouter = `/${getLangRoute(language)}/${curRouterMap[curRouterSlug]}`;
            if (this.router.url !== destinationRouter) {
                this.router.navigate([destinationRouter], { queryParamsHandling: 'merge' });
            }
            this.setPostType(curRouterSlug);
        });
    }

    setPostType(routerSlug: RouterSlug) {
        this.cuurentRoasterSlug = routerSlug;
        switch (routerSlug) {
            case RouterSlug.QA: {
                this.postType = PostType.QA;
                break;
            }
            case RouterSlug.ARTICLE: {
                this.postType = PostType.ARTICLE;
                break;
            }
            case RouterSlug.RECIPE: {
                this.postType = PostType.RECIPE;
                break;
            }
            case RouterSlug.EOW: {
                this.postType = PostType.ARTICLE;
                break;
            }
        }
    }

    getMenuItems(language) {
        const curRouterMap = RouterMap[language] || RouterMap.en;
        let menuItems = [];
        if (this.isGlobalSearchResultPage) {
            if (this.searchResult?.questions && this.searchResult?.questions.length > 0) {
                menuItems.push({
                    label: 'question_answers',
                    routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.QA]}`,
                    queryParams: { search: this.keyword },
                    command: () => this.setPostType(RouterSlug.QA),
                });
            }
            if (this.searchResult?.articles && this.searchResult?.articles.length > 0) {
                menuItems.push({
                    label: 'posts',
                    routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.ARTICLE]}`,
                    queryParams: { search: this.keyword },
                    command: () => this.setPostType(RouterSlug.ARTICLE),
                });
            }
            if (this.searchResult?.recipes && this.searchResult?.recipes.length > 0) {
                menuItems.push({
                    label: 'brewing_guides',
                    routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.RECIPE]}`,
                    queryParams: { search: this.keyword },
                    command: () => this.setPostType(RouterSlug.RECIPE),
                });
            }
        } else {
            menuItems = [
                {
                    label: 'question_answers',
                    routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.QA]}`,
                    command: () => this.setPostType(RouterSlug.QA),
                },
                {
                    label: 'posts',
                    routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.ARTICLE]}`,
                    command: () => this.setPostType(RouterSlug.ARTICLE),
                },
                {
                    label: 'brewing_guides',
                    routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.RECIPE]}`,
                    command: () => this.setPostType(RouterSlug.RECIPE),
                },
                {
                    label: 'about_era_of_we',
                    routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.EOW]}`,
                    command: () => this.setPostType(RouterSlug.EOW),
                },
            ];
        }
        return menuItems;
    }

    onWrite() {
        this.dialogSrv.open(SignupModalComponent, {});
    }

    handleSearch(): void {
        if (!this.keyword) {
            this.isGlobalSearchResultPage = false;
            this.searchResult = [];
            this.coffeeLabService.searchResult.next(this.searchResult);
            this.menuItems = this.getMenuItems(this.coffeeLabService.currentForumLanguage);
        }
    }

    startSearch(): void {
        if (!this.keyword) {
            // this.handleBackPage();
            return;
        }
        this.isLoading = true;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { search: this.keyword },
            queryParamsHandling: 'merge',
        });
        this.isGlobalSearchResultPage = true;
        const params = {
            query: this.keyword,
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            page: 1,
            per_page: 10000,
        };
        forkJoin([
            this.coffeeLabService.getForumList('question', params),
            this.coffeeLabService.getForumList('article', params),
            this.coffeeLabService.getForumList('recipe', params),
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
            this.coffeeLabService.searchResult.next(this.searchResult);
            this.menuItems = this.getMenuItems(this.coffeeLabService.currentForumLanguage);
            if (this.searchResult?.questions && this.searchResult?.questions.length > 0) {
                this.router.navigate(
                    [
                        `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/${
                            RouterMap[this.coffeeLabService.currentForumLanguage][RouterSlug.QA]
                        }`,
                    ],
                    {
                        relativeTo: this.route,
                        queryParams: { search: this.keyword },
                        queryParamsHandling: 'merge',
                    },
                );
            } else if (this.searchResult?.articles && this.searchResult?.articles.length > 0) {
                this.router.navigate(
                    [
                        `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/${
                            RouterMap[this.coffeeLabService.currentForumLanguage][RouterSlug.ARTICLE]
                        }`,
                    ],
                    {
                        relativeTo: this.route,
                        queryParams: { search: this.keyword },
                        queryParamsHandling: 'merge',
                    },
                );
            } else if (this.searchResult?.recipes && this.searchResult?.recipes.length > 0) {
                this.router.navigate(
                    [
                        `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/${
                            RouterMap[this.coffeeLabService.currentForumLanguage][RouterSlug.RECIPE]
                        }`,
                    ],
                    {
                        relativeTo: this.route,
                        queryParams: { search: this.keyword },
                        queryParamsHandling: 'merge',
                    },
                );
            }
            this.isLoading = false;
        });
    }

    handleBackPage(): void {
        this.isGlobalSearchResultPage = false;
        this.keyword = '';
        // this.router.navigate([], { relativeTo: this.route, queryParams: { search: '' }, queryParamsHandling: 'merge' });
    }
}
