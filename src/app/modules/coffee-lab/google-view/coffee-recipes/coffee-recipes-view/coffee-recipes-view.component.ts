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
import { ActivatedRoute } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { APP_LANGUAGES } from '@constants';
import { Fields, PostType } from '@enums';
import { environment } from '@env/environment';
import { RedirectPopupComponent } from '@modules/coffee-lab/components/redirect-popup/redirect-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, ResizeService, SEOService } from '@services';
import { getCookie, getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeeRecipesViewComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    rows = 9;
    totalRecords = 0;
    page = 1;
    isAvailableTranslation: boolean = null;
    level: string;
    ingredientValue?: string;
    searchQuery = '';
    coffeeRecipeData: any[] = [];
    isLoading = false;
    showAll = true;
    selectedOrder: string;
    jsonLD: any;
    categoryList: any[] = [];
    selectedCategory = null;
    translationsList: any[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    levels = [
        { label: 'expertise_easy', value: 'expertise_easy' },
        { label: 'expertise_intermediate', value: 'expertise_intermediate' },
        { label: 'expertise_hard', value: 'expertise_hard' },
    ];
    orderList: any[] = [
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
    ];
    hideContent: boolean;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private route: ActivatedRoute,
        private seoService: SEOService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        private dialogSrv: DialogService,
    ) {
        super(resizeService);

        if (isPlatformBrowser(this.platformId)) {
            if (this.isMobile$) {
                this.showAll = false;
            }
            window.scrollTo(0, 0);
        }
    }

    ngOnInit(): void {
        this.setSEO();
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                this.page = +params.get('page');
                if (this.page < 1) {
                    this.page = 1;
                }
            }
            this.hideContent = params.has('search') ? true : false;
            this.refreshData();
        });
        let langPrefix = '';
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            if (language) {
                if (langPrefix) {
                    this.refreshData();
                }
                langPrefix = language;
            }
        });
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
        if (isPlatformBrowser(this.platformId)) {
            this.coffeeLabService.getIpInfo().subscribe((resp: any) => {
                APP_LANGUAGES.forEach((item) => {
                    if (item.countries.includes(resp.countryCode)) {
                        if (
                            this.coffeeLabService.currentForumLanguage !== item.value &&
                            getCookie('langChange') !== 'set'
                        ) {
                            this.dialogSrv.open(RedirectPopupComponent, {
                                data: {
                                    langName: item.label.en,
                                    langCode: item.value,
                                    countryName: resp.countryName,
                                },
                            });
                        }
                    }
                });
            });
        }
    }

    refreshData() {
        this.coffeeLabService.searchResult.subscribe((res: any) => {
            if (res?.recipes && this.hideContent) {
                this.coffeeRecipeData = res.recipes;
                this.isLoading = false;
            } else {
                this.getData();
            }
        });
        this.getCategory();
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

    getData(): void {
        const params = {
            query: this.searchQuery,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' || !this.selectedOrder ? 'desc' : 'asc',
            level: this.level?.toLowerCase(),
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
            fields: Fields.INTERMEDIATE,
        };
        this.isLoading = true;
        this.cdr.detectChanges();
        this.coffeeLabService.getForumList(PostType.RECIPE, params).subscribe((res) => {
            if (res.success) {
                this.coffeeRecipeData = res.result ?? [];
                this.totalRecords = res.result_info.total_count;
                this.setSchemaMackup();
            }
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    getCategory() {
        const params = { language: this.coffeeLabService.currentForumLanguage, is_recipe: true };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
            this.cdr.detectChanges();
        });
    }

    setSEO() {
        this.translator
            .getStreamOnTranslationChange(['tcl_seo_meta_title_recipe', 'tcl_seo_meta_description_recipe'])
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((res) => {
                this.seoService.setSEO(res.tcl_seo_meta_title_recipe, res.tcl_seo_meta_description_recipe);
            });
    }

    setSchemaMackup() {
        const forumList: any[] = [];
        for (const forum of this.coffeeRecipeData) {
            const itemData = {
                '@type': 'Recipe',
                author: forum.posted_user,
                cookTime: forum.cooking_time,
                datePublished: forum.posted_at,
                description: forum.description,
                image: forum.cover_image_url,
                name: forum.name,
                prepTime: forum.preparation_time,
                recipeYield: forum.serves,
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
                            item: `${environment.coffeeLabWeb}${getLangRoute(
                                this.coffeeLabService.currentForumLanguage,
                            )}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Brewing Gudes',
                        },
                    ],
                },
                ...forumList,
            ],
        };
    }
}
