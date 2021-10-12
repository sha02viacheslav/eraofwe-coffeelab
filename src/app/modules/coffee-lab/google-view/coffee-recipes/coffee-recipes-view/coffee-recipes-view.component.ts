import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService, SEOService, ResizeService } from '@services';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { ResizeableComponent } from '@base-components';
import { getLangRoute } from '@utils';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
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
    isAvailableTranslation?: string;
    label?: string;
    ingredientValue?: string;
    searchQuery = '';
    coffeeRecipeData: any[] = [];
    isLoading = false;
    translationsList: any[] = [
        {
            label: 'Yes',
            value: true,
        },
        {
            label: 'No',
            value: false,
        },
    ];

    levels: any[] = [];
    orderList: any[] = [];
    selectedOrder = '';
    jsonLD: any;
    categoryList: any[] = [];
    selectedCategory: string;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private route: ActivatedRoute,
        private seoService: SEOService,
        private toastService: ToastrService,
        protected resizeService: ResizeService,
        private coffeeLabService: CoffeeLabService,
        private translator: TranslateService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.setSEO();
        this.orderList = [
            {
                label: this.translator.instant('latest'),
                value: 'latest',
            },
            {
                label: this.translator.instant('oldest'),
                value: 'oldest',
            },
        ];
        this.levels = [
            {
                label: this.translator.instant('easy'),
                value: 'easy',
            },
            {
                label: this.translator.instant('intermediate'),
                value: 'intermediate',
            },
            {
                label: this.translator.instant('hard'),
                value: 'hard',
            },
        ];
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
        this.orderList = [
            {
                label: this.translator.instant('latest'),
                value: 'latest',
            },
            {
                label: this.translator.instant('oldest'),
                value: 'oldest',
            },
        ];

        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                this.page = +params.get('page');
                if (this.page < 1) {
                    this.page = 1;
                }
            }
            this.getData();
            this.getCategory();
            if (isPlatformBrowser(this.platformId)) {
                window.scrollTo(0, 0);
            }
        });
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            query: this.searchQuery,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' || this.selectedOrder === '' ? 'desc' : 'asc',
            level: this.label?.toLowerCase(),
            category_slug: this.selectedCategory,
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
