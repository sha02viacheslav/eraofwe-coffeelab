import { isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { APP_LANGUAGES, RouterMap, SlugMap } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { CoffeeLabService, ResizeService, SEOService, StartupService } from '@services';
import { getLangRoute } from '@utils';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    providers: [TitleCasePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent extends ResizeableComponent implements OnInit {
    isLoading = false;
    slug: string;
    currentCategory: any;
    otherCategories: any[] = [];
    previousUrl: string;
    currentLangCode: string;
    topWriters: any[] = [];
    jsonLD: any;
    menuItems = [];
    selectedPostType: string;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private activateRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private seoService: SEOService,
        private startupService: StartupService,
        protected resizeService: ResizeService,
        public titleCasePipe: TitleCasePipe,
    ) {
        super(resizeService);
        this.activateRoute.params.subscribe((params) => {
            this.slug = params.category;
            this.selectedPostType = this.activateRoute.firstChild.routeConfig.path;
            this.currentLangCode = params.lang === 'pt-br' ? 'pt' : params.lang;
            if (this.selectedPostType === RouterMap.en[RouterSlug.QA]) {
                this.getCategories(false);
            }
        });
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.scroll(0, 0);
        }
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.currentLangCode = language;
            this.startupService.load(language);
            this.selectedPostType = this.activateRoute.firstChild.routeConfig.path;
            this.onTabChange(this.selectedPostType, true);
            if (this.selectedPostType !== RouterMap.en[RouterSlug.QA]) {
                this.getSingleCategory(true);
            } else {
                this.getCategories(true);
            }
        });
    }

    getSingleCategory(isLangChanged?: boolean): void {
        this.isLoading = true;
        const params = {
            language: this.coffeeLabService.currentForumLanguage,
            slug: this.currentCategory ? '' : this.slug,
            parent_id: this.currentCategory?.parent_id,
            is_recipe: false,
        };
        if (this.selectedPostType === RouterMap.en[RouterSlug.RECIPE]) {
            params.is_recipe = true;
        }
        this.coffeeLabService.getCategory(params).subscribe((res) => {
            if (res.success) {
                if (isLangChanged) {
                    this.currentCategory = res.result[0];
                    this.getMenuItems(this.currentLangCode);
                    this.router.navigateByUrl(
                        getLangRoute(this.currentLangCode) +
                            '/' +
                            this.currentCategory.slug +
                            '/' +
                            this.selectedPostType,
                    );
                }
                this.setSEO();
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    getCategories(isLangChanged: boolean) {
        this.otherCategories = [];
        const params = { language: this.coffeeLabService.currentForumLanguage, is_recipe: false };
        if (this.selectedPostType === RouterMap.en[RouterSlug.RECIPE]) {
            params.is_recipe = true;
        }
        this.isLoading = true;
        this.coffeeLabService.getCategory(params).subscribe((res) => {
            if (res.success) {
                if (isLangChanged) {
                    const isCategory = res.result.find(
                        (element) => element.parent_id === this.currentCategory?.parent_id,
                    );
                    if (isCategory) {
                        this.slug = isCategory.slug;
                        this.router.navigateByUrl(
                            getLangRoute(this.currentLangCode) + '/' + this.slug + '/' + this.selectedPostType,
                        );
                        this.currentCategory = isCategory;
                        this.getMenuItems(this.currentLangCode);
                    }
                }
                this.asssignCategories(res.result);
            }
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    asssignCategories(data: any) {
        this.otherCategories = data.filter((element) => element.slug !== this.slug);
        this.coffeeLabService.otherCategories.next(this.otherCategories);
        this.currentCategory = data.find((item) => item.slug === this.slug);
        this.getMenuItems(this.currentLangCode);
        this.setSEO();
    }

    getAllTopWriters() {
        this.coffeeLabService.getTopWriters({ count: 4 }).subscribe((res) => {
            if (res.success) {
                this.topWriters = res.result;
            }
            this.cdr.detectChanges();
        });
    }

    setSEO() {
        const title =
            this.currentCategory?.name +
            ' ' +
            APP_LANGUAGES.find((lang) => lang.value === this.currentLangCode)?.label[this.currentLangCode] +
            ' ' +
            this.titleCasePipe.transform(SlugMap[this.selectedPostType]) +
            ' - A Global Coffee Community';
        const description =
            this.titleCasePipe.transform(SlugMap[this.selectedPostType]) +
            ' - ' +
            this.currentCategory?.description +
            ' - Era of We';
        this.seoService.setSEO(title, description);
    }

    setSchemaMackup() {
        // Waiting Lukasz
    }

    onTabChange(type: string, onLoad?: boolean) {
        if (type === RouterMap.en[RouterSlug.QA] && !onLoad) {
            this.getCategories(false);
        }
        this.previousUrl = `/${getLangRoute(this.currentLangCode)}/${type}`;
    }

    getMenuItems(language) {
        if (this.currentCategory?.is_recipe) {
            this.menuItems = [
                {
                    label: 'brewing_guides',
                    postType: PostType.RECIPE,
                    routerLink: `/${getLangRoute(language)}/${this.slug}/coffee-recipes`,
                    command: () => this.onTabChange(RouterMap.en[RouterSlug.RECIPE]),
                },
            ];
        } else {
            this.menuItems = [
                {
                    label: 'question_answers',
                    postType: PostType.QA,
                    routerLink: `/${getLangRoute(language)}/${this.slug}/qa-forum`,
                    command: () => this.onTabChange(RouterMap.en[RouterSlug.QA]),
                },
                {
                    label: 'posts',
                    postType: PostType.ARTICLE,
                    routerLink: `/${getLangRoute(language)}/${this.slug}/articles`,
                    command: () => this.onTabChange(RouterMap.en[RouterSlug.ARTICLE]),
                },
            ];
        }
    }
}
