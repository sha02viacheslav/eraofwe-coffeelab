import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, ResizeService, SEOService } from '@services';
import { getLangRoute } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
})
export class CoffeeRecipesViewComponent extends ResizeableComponent implements OnInit {
    rows = 9;
    totalRecords = 0;
    page = 1;
    isAvailableTranslation: boolean = null;
    level: string;
    ingredientValue?: string;
    searchQuery = '';
    coffeeRecipeData: any[] = [];
    isLoading = false;
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
        this.isLoading = true;
        const params = {
            query: this.searchQuery,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' || !this.selectedOrder ? 'desc' : 'asc',
            level: this.level?.toLowerCase(),
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList('recipe', params).subscribe((res) => {
            if (res.success) {
                this.coffeeRecipeData = (res.result ?? []).filter((item) => item.publish === true);
                this.totalRecords = res.result_info.total_count;
                this.setSchemaMackup();
            } else {
                this.toastService.error('Cannot get Recipes data');
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
                            item: `${environment.coffeeLabWeb}/${getLangRoute(
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
