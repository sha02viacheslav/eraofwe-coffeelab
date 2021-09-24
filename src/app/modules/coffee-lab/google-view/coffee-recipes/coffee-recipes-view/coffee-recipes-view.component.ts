import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService, GlobalsService, SEOService, ResizeService } from '@services';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';
import { environment } from '@env/environment';
import { ResizeableComponent } from '@base-components';
import { SeoDescription, SeoTitle } from '@constants';
import { takeUntil } from 'rxjs/operators';
import { RouterSlug } from '@enums';
import { getLangRoute } from '@utils';
import { TranslateService } from '@ngx-translate/core';

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
    searchIngredient = '';
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

    constructor(
        private globalsService: GlobalsService,
        private route: ActivatedRoute,
        private router: Router,
        private seoService: SEOService,
        private toastService: ToastrService,
        protected resizeService: ResizeService,
        public coffeeLabService: CoffeeLabService,
        public dialogSrv: DialogService,
        private translator: TranslateService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.setSEO();
        this.coffeeLabService.gotTranslations.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
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
        });

        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                this.page = +params.get('page');
                if (this.page < 1) {
                    this.page = 1;
                }
            }
            this.getData();
        });
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            query: this.searchQuery,
            ingredient: this.searchIngredient,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' || this.selectedOrder === '' ? 'desc' : 'asc',
            level: this.label?.toLowerCase(),
            page: this.page,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList('recipe', params).subscribe((res) => {
            if (res.success) {
                this.coffeeRecipeData = (res.result ?? []).filter((item) => item.publish === true);
                this.coffeeRecipeData[0].equipment_name = '1 medium pot, mesh or cloth strainer';
                this.totalRecords = res.result_info.total_count;
                this.coffeeRecipeData.map((item) => {
                    item.description = this.globalsService.getJustText(item.description);
                    item.cardType = 'forum';
                    return item;
                });
                const joinCard = {
                    cardType: 'joinCard',
                };
                // if (this.coffeeRecipeData.length < 3) {
                //     this.coffeeRecipeData.push(joinCard);
                // } else {
                //     this.coffeeRecipeData.splice(2, 0, joinCard);
                // }
                this.setSchemaMackup();
            } else {
                this.toastService.error('Cannot get Recipes data');
            }
            this.isLoading = false;
        });
    }

    paginate(event: any) {
        if (this.page !== event.page + 1) {
            this.router.navigate([], { queryParams: { page: event.page + 1 } });
        }
    }

    getLink(item) {
        const url = `/${getLangRoute(item.lang_code)}/coffee-recipes/${item.slug}`;
        return url;
    }

    gotoDetailPage(event, item: any) {
        event.stopPropagation();
        event.preventDefault();
        if (this.globalsService.getLimitCounter() > 0) {
            this.router.navigate([this.getLink(item)]);
        } else {
            this.dialogSrv.open(SignupModalComponent, { data: { isLimit: true } });
        }
    }

    onFocus(event) {
        event.stopPropagation();
        event.preventDefault();
        this.dialogSrv.open(SignupModalComponent, {});
    }

    setSEO() {
        const title = SeoTitle[this.coffeeLabService.currentForumLanguage][RouterSlug.RECIPE];
        const description = SeoDescription[this.coffeeLabService.currentForumLanguage][RouterSlug.RECIPE];
        this.seoService.setSEO(title, description);
    }

    setSchemaMackup() {
        const forumList: any[] = [];
        for (const forum of this.coffeeRecipeData) {
            const itemData = {
                '@type': 'Recipe',
                author: forum.posted_user,
                cookTime: forum.cooking_time,
                datePublished: forum.posted_at,
                description: this.globalsService.getJustText(forum.description),
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
