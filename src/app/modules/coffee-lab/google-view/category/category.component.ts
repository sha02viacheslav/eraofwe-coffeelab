import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { RouterMap } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { CoffeeLabService, ResizeService, SEOService, StartupService } from '@services';
import { getLangRoute } from '@utils';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    readonly PostType = PostType;
    isLoading = false;
    showAll = true;
    isBrowser = false;
    selectedTab = 0;
    slug: string;
    currentCategory: any;
    otherCategories: any[] = [];
    previousUrl: string;
    currentLangCode: string;
    topWriters: any[] = [];
    jsonLD: any;
    menuItems = [
        {
            label: 'question_answers',
            postType: PostType.QA,
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'posts',
            postType: PostType.ARTICLE,
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'brewing_guides',
            postType: PostType.RECIPE,
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
    ];

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private activateRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private seoService: SEOService,
        private startupService: StartupService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.activateRoute.params.subscribe((params) => {
            this.slug = params.category;
            this.currentLangCode = params.lang === 'pt-br' ? 'pt' : params.lang;
            this.getCategories(false);
        });

        if (isPlatformBrowser(this.platformId)) {
            this.isBrowser = true;
            if (this.isMobile$) {
                this.showAll = false;
            }
            window.scrollTo(0, 0);
        }
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.currentLangCode = language;
            this.startupService.load(language);
            this.getCategories(true);
        });
        this.getAllTopWriters();
        this.onChangeTab(this.selectedTab);
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId) && this.isMobile$) {
            const scrollEvent = fromEvent(window, 'scroll')
                .pipe(debounceTime(100))
                .pipe(takeUntil(this.unsubscribeAll$))
                .subscribe((res) => {
                    if (window.scrollY > 10) {
                        scrollEvent.unsubscribe();
                        this.showAll = true;
                        this.cdr.detectChanges();
                    }
                });
        }
    }

    onChangeTab(index: number) {
        this.selectedTab = index;
        if (this.selectedTab === 0) {
            this.previousUrl = `/${getLangRoute(this.currentLangCode)}/${
                (RouterMap[this.currentLangCode] || RouterMap.en)[RouterSlug.QA]
            }`;
        } else if (this.selectedTab === 1) {
            this.previousUrl = `/${getLangRoute(this.currentLangCode)}/${
                (RouterMap[this.currentLangCode] || RouterMap.en)[RouterSlug.ARTICLE]
            }`;
        } else if (this.selectedTab === 2) {
            this.previousUrl = `/${getLangRoute(this.currentLangCode)}/${
                (RouterMap[this.currentLangCode] || RouterMap.en)[RouterSlug.RECIPE]
            }`;
        }
        window.scroll(0, 0);
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
                        this.router.navigateByUrl(getLangRoute(this.currentLangCode) + '/' + isCategory.slug);
                        this.currentCategory = isCategory;
                        this.slug = this.currentCategory.slug;
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
        this.currentCategory = data.find((item) => item.slug === this.slug);
        this.setSEO();
        this.onChangeTab(this.selectedTab);
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
        const title = this.currentCategory.name + ' - A Global Coffee Community';
        const description =
            this.currentCategory.name +
            ' - A global coffee marketplace that brings together all members of the supply chain and shifts the value of the coffee brand back to the growers';
        this.seoService.setSEO(title, description);
    }

    setSchemaMackup() {
        // Waiting Lukasz
    }
}
