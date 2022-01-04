import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { RouterMap } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { CoffeeLabService, ResizeService, SEOService, StartupService } from '@services';
import { getLangRoute } from '@utils';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
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
    menuItems: MenuItem[] = [];
    selectedType: string;

    constructor(
        private activateRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private seoService: SEOService,
        private startupService: StartupService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.selectedType = this.activateRoute.firstChild.routeConfig.path;
        this.activateRoute.params.subscribe((params) => {
            this.slug = params.category;
            this.currentLangCode = params.lang === 'pt-br' ? 'pt' : params.lang;
            this.menuItems = this.getMenuItems(this.currentLangCode);
            if (this.selectedType === 'qa-forum') {
                this.getCategories(false);
            }
        });
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.menuItems = this.getMenuItems(this.currentLangCode);
            this.currentLangCode = language;
            this.startupService.load(language);
            this.setPreviousUrl(this.selectedType, true);
            if (this.selectedType !== 'qa-forum') {
                this.getSingleCategory();
            } else {
                this.getCategories(true);
            }
        });
    }

    getSingleCategory(): void {
        this.isLoading = true;
        this.coffeeLabService.getCategory(this.currentLangCode, this.slug).subscribe((res) => {
            if (res.success) {
                this.currentCategory = res.result[0];
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    getCategories(isLangChanged: boolean) {
        this.otherCategories = [];
        this.isLoading = true;
        this.coffeeLabService.getCategory(this.currentLangCode).subscribe((res) => {
            if (res.success) {
                if (isLangChanged) {
                    const isCategory = res.result.find(
                        (element) => element.parent_id === this.currentCategory?.parent_id,
                    );
                    if (isCategory) {
                        this.slug = isCategory.slug;
                        this.router.navigateByUrl(
                            getLangRoute(this.currentLangCode) + '/' + isCategory.slug + '/' + this.selectedType,
                        );
                        this.currentCategory = isCategory;
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
        const title = this.currentCategory?.name + ' - A Global Coffee Community';
        const description =
            this.currentCategory?.name +
            ' - A global coffee marketplace that brings together all members of the supply chain and shifts the value of the coffee brand back to the growers';
        this.seoService.setSEO(title, description);
    }

    setSchemaMackup() {
        // Waiting Lukasz
    }

    setPreviousUrl(type: string, onLoad?: boolean) {
        this.previousUrl = `/${getLangRoute(this.currentLangCode)}/${type}`;
        if (type === 'qa-forum' && !onLoad) {
            this.getCategories(false);
        }
    }

    getMenuItems(language) {
        return [
            {
                label: 'question_answers',
                postType: PostType.QA,
                icon: 'assets/images/qa-forum.svg',
                activeIcon: 'assets/images/qa-forum-active.svg',
                routerLink: `/${getLangRoute(language)}/${this.slug}/qa-forum`,
                command: () => this.setPreviousUrl((RouterMap[this.currentLangCode] || RouterMap.en)[RouterSlug.QA]),
            },
            {
                label: 'posts',
                postType: PostType.ARTICLE,
                icon: 'assets/images/article.svg',
                activeIcon: 'assets/images/article-active.svg',
                routerLink: `/${getLangRoute(language)}/${this.slug}/articles`,
                command: () =>
                    this.setPreviousUrl((RouterMap[this.currentLangCode] || RouterMap.en)[RouterSlug.ARTICLE]),
            },
            {
                label: 'brewing_guides',
                postType: PostType.RECIPE,
                icon: 'assets/images/coffee-recipe.svg',
                activeIcon: 'assets/images/coffee-recipe-active.svg',
                routerLink: `/${getLangRoute(language)}/${this.slug}/coffee-recipes`,
                command: () =>
                    this.setPreviousUrl((RouterMap[this.currentLangCode] || RouterMap.en)[RouterSlug.RECIPE]),
            },
        ];
    }
}
