import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService, GlobalsService, SEOService, ResizeService } from '@services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';
import { environment } from '@env/environment';
import { ResizeableComponent } from '@base-components';
import { SeoDescription, SeoTitle } from '@constants';
import { takeUntil } from 'rxjs/operators';
import { RouterSlug } from '@enums';

@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
})
export class CoffeeRecipesViewComponent extends ResizeableComponent implements OnInit {
    rows = 9;
    totalRecords = 0;
    page = 1;
    destroy$: Subject<boolean> = new Subject<boolean>();
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
    isSaveBtn = false;
    selectedOrder = 'latest';
    jsonLD: any;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private globalsService: GlobalsService,
        private route: ActivatedRoute,
        private router: Router,
        private seoService: SEOService,
        private toastService: ToastrService,
        protected resizeService: ResizeService,
        public coffeeLabService: CoffeeLabService,
        public dialogSrv: DialogService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.setSEO();
        this.coffeeLabService.gotTranslations.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.orderList = [
                {
                    label: this.globalsService.languageJson?.latest,
                    value: 'latest',
                },
                {
                    label: this.globalsService.languageJson?.oldest,
                    value: 'oldest',
                },
            ];
            this.levels = [
                {
                    label: this.globalsService.languageJson?.easy,
                    value: 'easy',
                },
                {
                    label: this.globalsService.languageJson?.intermediate,
                    value: 'intermediate',
                },
                {
                    label: this.globalsService.languageJson?.hard,
                    value: 'hard',
                },
            ];
            this.translationsList = [
                {
                    label: this.globalsService.languageJson?.yes,
                    value: true,
                },
                {
                    label: this.globalsService.languageJson?.no,
                    value: false,
                },
            ];
            this.orderList = [
                {
                    label: this.globalsService.languageJson?.latest,
                    value: 'latest',
                },
                {
                    label: this.globalsService.languageJson?.oldest,
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
            sort_order: this.selectedOrder === 'latest' ? 'desc' : 'asc',
            level: this.label?.toLowerCase(),
            page: this.page,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList('recipe', params).subscribe((res) => {
            if (res.success) {
                this.coffeeRecipeData = (res.result ?? []).filter((item) => item.publish === true);
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
        const url = `/${item.lang_code}/coffee-recipes/${item.slug}`;
        return url;
    }

    gotoDetailPage(event, item: any) {
        if (!this.isSaveBtn) {
            event.stopPropagation();
            event.preventDefault();
            if (this.globalsService.getLimitCounter() > 0) {
                this.router.navigate([this.getLink(item)]);
            } else {
                this.dialogSrv.open(SignupModalComponent, {
                    data: {
                        isLimit: true,
                    },
                    showHeader: false,
                    styleClass: 'signup-dialog',
                });
            }
        }
    }

    openRecipe(coffee) {
        if (!this.isSaveBtn) {
            this.router.navigateByUrl(this.getLink(coffee));
        }
    }

    onFocus() {
        this.isSaveBtn = true;
        setTimeout(() => {
            this.isSaveBtn = false;
            this.dialogSrv.open(SignupModalComponent, {
                showHeader: false,
                styleClass: 'signup-dialog',
            });
        }, 100);
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
                            item: `${environment.coffeeLabWeb}/${this.coffeeLabService.currentForumLanguage}`,
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
