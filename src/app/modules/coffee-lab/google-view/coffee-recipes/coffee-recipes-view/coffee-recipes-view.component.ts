import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService, GlobalsService, SEOService, ResizeService } from '@services';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';
import { environment } from '@env/environment';
import { ResizeableComponent } from '@base-components';
import { seoVariables } from '@constants';

@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
})
export class CoffeeRecipesViewComponent extends ResizeableComponent implements OnInit, OnDestroy {
    rows = 9;
    pageNumber = 1;
    totalRecords = 0;
    destroy$: Subject<boolean> = new Subject<boolean>();
    isAvailableTranslation?: string;
    label?: string;
    ingredientValue?: string;
    searchQuery = '';
    searchIngredient = '';
    coffeeRecipeData: any[] = [];
    isLoading = false;
    forumLanguage: string;
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

    levels: any[] = [
        {
            label: 'Easy',
            value: 'Easy',
        },
        {
            label: 'Intermediate',
            value: 'Intermediate',
        },
        {
            label: 'Hard',
            value: 'Hard',
        },
    ];
    orderList: any[] = [
        {
            label: 'Latest',
            value: 'latest',
        },
        {
            label: 'Oldest',
            value: 'oldest',
        },
    ];

    selectedOrder = 'latest';
    jsonLD: any;

    constructor(
        private toastService: ToastrService,
        private router: Router,
        public coffeeLabService: CoffeeLabService,
        public dialogSrv: DialogService,
        private globalsService: GlobalsService,
        private seoService: SEOService,
        protected resizeService: ResizeService,
        @Inject(DOCUMENT) private document: Document,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.setSEO();
            this.getCoffeeRecipesData();
        });
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
    }

    getCoffeeRecipesData(): void {
        this.isLoading = true;
        const params = {
            query: this.searchQuery,
            ingredient: this.searchIngredient,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' ? 'desc' : 'asc',
            level: this.label?.toLowerCase(),
            page: this.pageNumber,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList('recipe', params, this.forumLanguage).subscribe((res) => {
            if (res.success) {
                if (res.result) {
                    this.coffeeRecipeData = (res.result ?? []).filter((item) => item.publish === true);
                    this.totalRecords = res.result_info.total_count;
                    this.rows = res.result_info.per_page;
                    this.coffeeRecipeData.map((item) => {
                        item.description = this.globalsService.getJustText(item.description);
                        return item;
                    });
                    this.setSchemaMackup();
                }
            } else {
                this.toastService.error('Cannot get Recipes data');
            }
            this.isLoading = false;
        });
    }

    getData(event) {
        if (event.page > -1) {
            const currentPage = event.first / this.rows;
            this.pageNumber = currentPage + 1;
            this.getCoffeeRecipesData();
        }
    }

    getLink(item) {
        const url = `/${item.lang_code}/coffee-recipes/${item.slug}`;
        return url;
    }

    gotoDetailPage(event, item: any) {
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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    setSEO() {
        const title =
            this.forumLanguage === 'en'
                ? 'Coffee recipes & brewing guides - The Coffee Lab'
                : 'Kafferecept och bryggguider - The Coffee Lab';
        const description =
            this.forumLanguage === 'en'
                ? 'Coffee Recipes and brewing guides created by experts from the coffee community.'
                : 'Kafferecept och bryggguider skapat av kaffe experter från kaffeindustrin.';
        this.seoService.setPageTitle(title);
        this.seoService.setMetaData('name', 'description', description);

        this.seoService.setMetaData('property', 'og:title', title);
        this.seoService.setMetaData('property', 'og:image', seoVariables.image);
        this.seoService.setMetaData('property', 'og:description', description);
        this.seoService.setMetaData('property', 'og:url', this.document.URL);

        this.seoService.setMetaData('name', 'twitter:creator', seoVariables.author);
        this.seoService.setMetaData('name', 'twitter:site', this.document.URL);
        this.seoService.setMetaData('name', 'twitter:title', title);
        this.seoService.setMetaData('name', 'twitter:description', description);
        this.seoService.setMetaData('name', 'twitter:image', seoVariables.image);
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
                            item: `${environment.coffeeLabWeb}/${this.forumLanguage}`,
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
