import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CoffeeLabService, SEOService, StartupService, GlobalsService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';
import { RouterMap, seoVariables } from '@constants';
import { RouterSlug } from '@enums';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '@app/modules/coffee-lab/components/signup-modal/signup-modal.component';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    buttonList = [{ button: 'Roasting' }, { button: 'Coffee grinding' }, { button: 'Brewing' }];
    infoData: any[] = [
        {
            icon: 'assets/images/aeropress.svg',
            label: 'equipment',
            key: 'equipment_name',
        },
        {
            icon: 'assets/images/brew-ratio.svg',
            label: 'brew_ratio',
            key: 'coffee_ratio',
            key2: 'water_ratio',
        },
        {
            icon: 'assets/images/yeild.svg',
            label: 'yeild',
            key: 'serves',
        },
    ];

    loading = true;
    jsonLD: any;
    lang: any;
    previousUrl: string;
    stickData: any;
    commentData: any[] = [];

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private seoService: SEOService,
        private toastService: ToastrService,
        private startupService: StartupService,
        private globalsService: GlobalsService,
        public dialogSrv: DialogService,
        @Inject(DOCUMENT) private doc,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.getDetails();
            }
            if (!this.relatedData?.length) {
                this.getRecipeList();
            }
        });
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
        // this.setSEO();
    }

    getRecipeList() {
        this.coffeeLabService.getForumList('recipe', { page: 1, per_page: 4 }).subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 4);
                if (!this.idOrSlug) {
                    this.router.navigate([`/coffee-recipes/${this.relatedData[0].slug}`]);
                }
            }
        });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('recipe', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
                this.globalsService.setLimitCounter();
                this.lang = res.result.lang_code;
                this.startupService.load(this.lang || 'en');
                this.previousUrl = `/${this.lang}/${RouterMap[this.lang][RouterSlug.RECIPE]}`;
                this.setSEO();
                this.setSchemaMackup();
                this.getUserDetail();
                this.getCommentsData();
            } else {
                this.toastService.error('The recipe is not exist.');
                this.router.navigate(['/error']);
            }
            this.loading = false;
        });
    }

    getUserDetail(): void {
        this.coffeeLabService
            .getUserDetail(this.detailsData.posted_by, this.detailsData.organisation_type)
            .subscribe((res) => {
                if (res.success) {
                    this.stickData = res.result;
                }
            });
    }

    getCommentsData(): void {
        this.coffeeLabService.getCommentList('recipe', this.detailsData.slug).subscribe((res: any) => {
            if (res.success) {
                this.commentData = res.result;
            }
        });
    }

    setSEO() {
        let title: string;
        let description: string;
        if (this.detailsData?.name) {
            if (this.detailsData?.name.length < 40) {
                title = this.detailsData?.name.concat(' - Era of We Coffee Marketplace');
            } else {
                title = this.detailsData?.name;
            }
        } else {
            title = 'Era of We Coffee Marketplace';
        }
        if (this.detailsData?.description) {
            if (this.globalsService.getJustText(this.detailsData?.description).length < 60) {
                description = this.detailsData?.description.concat(
                    ' - Era of We A global coffee marketplace and community that brings together all members of the supply chain',
                );
            } else {
                description = this.globalsService.getJustText(this.detailsData?.description);
            }
        } else {
            description =
                'Era of We A global coffee marketplace and community that brings together all members of the supply chain';
        }
        const imageUrl = this.detailsData?.cover_image_url || seoVariables.image;

        this.seoService.setSEO(title, description);
    }

    setSchemaMackup() {
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
                            item: `${environment.coffeeLabWeb}/${this.lang}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Brewing guides',
                            item: `${environment.coffeeLabWeb}/${this.lang}/coffee-recipes`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 3,
                            name: this.detailsData?.name,
                        },
                    ],
                },
                {
                    '@type': 'Recipe',
                    author: this.detailsData?.posted_user,
                    cookTime: this.detailsData?.cooking_time,
                    datePublished: this.detailsData?.posted_at,
                    description: this.globalsService.getJustText(this.detailsData?.description),
                    image: this.detailsData?.cover_image_url,
                    recipeIngredient: this.detailsData?.ingredients?.map((item) => {
                        return `${item.quantity} ${item.quantity_unit}  ${item.name}`;
                    }),
                    name: this.detailsData?.name,
                    prepTime: this.detailsData?.preparation_time,
                    recipeInstructions: this.detailsData?.steps?.map((item, index) => {
                        return {
                            '@type': 'HowToStep',
                            name: `Step ${index + 1}`,
                            text: this.globalsService.getJustText(item.description),
                            url: `${this.doc.URL}?#step${index + 1}`,
                            image: item.image_url,
                        };
                    }),
                    recipeYield: this.detailsData?.serves,
                },
            ],
        };
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {
            showHeader: false,
            styleClass: 'signup-dialog',
        });
    }
}
