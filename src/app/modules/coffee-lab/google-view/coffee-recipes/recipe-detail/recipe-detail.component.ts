import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CoffeeLabService, SEOService, StartupService, GlobalsService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';
import { RouterMap, seoVariables } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
    providers: [MessageService],
})
export class RecipeDetailComponent implements OnInit {
    readonly PostType = PostType;
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
    stickySecData: any;
    orginalUserData: any;
    commentData: any[] = [];
    allComments: any[] = [];
    showCommentBtn = false;
    urlLang: string;
    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private seoService: SEOService,
        private toastService: ToastrService,
        private startupService: StartupService,
        public globalsService: GlobalsService,
        private messageService: MessageService,
        public dialogSrv: DialogService,
        @Inject(DOCUMENT) private doc,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.urlLang = params?.lang;
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.getDetails();
            }
            if (!this.relatedData?.length) {
                this.getRecipeList();
            }
            if (isPlatformBrowser(this.platformId)) {
                window.scrollTo(0, 0);
            }
        });
    }

    ngOnInit(): void {}

    onRealtedRoute(langCode, slug) {
        this.router.navigateByUrl(`/en/coffee-recipes/${slug}`);
        window.scrollTo(0, 0);
    }

    getRecipeList() {
        const params = {
            count: 10,
        };
        this.coffeeLabService.getPopularList('recipe', params).subscribe((res) => {
            if (res.success) {
                this.relatedData = res.result;
                this.relatedData.map((item) => {
                    item.description = this.globalsService.getJustText(item.description);
                    return item;
                });
            }
        });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('recipe', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                if (getLangRoute(res.result.lang_code) !== this.urlLang) {
                    this.router.navigateByUrl('/error');
                } else {
                    this.detailsData = res.result;
                    this.detailsData.description = this.globalsService.getJustText(this.detailsData.description);
                    this.globalsService.setLimitCounter();
                    this.lang = res.result.lang_code;
                    this.startupService.load(this.lang || 'en');
                    this.previousUrl = `/${getLangRoute(this.lang)}/${
                        (RouterMap[this.lang] || RouterMap.en)[RouterSlug.RECIPE]
                    }`;
                    this.setSEO();
                    this.setSchemaMackup();
                    if (
                        this.detailsData?.original_recipe_state &&
                        this.detailsData?.original_recipe_state === 'ACTIVE'
                    ) {
                        this.getOriginalUserDetail(this.detailsData.original_details);
                    }
                    this.getUserDetail(this.detailsData);
                    this.getCommentsData();
                    this.messageService.clear();
                    this.messageService.add({
                        key: 'translate',
                        severity: 'success',
                        closable: false,
                    });
                }
            } else {
                this.toastService.error('The recipe is not exist.');
                this.router.navigate(['/error']);
            }
            this.loading = false;
        });
    }

    getUserDetail(userDatils: any): void {
        this.coffeeLabService.getUserDetail(userDatils.posted_by, userDatils.organisation_type).subscribe((res) => {
            if (res.success) {
                this.stickySecData = res.result;
            }
        });
    }

    getOriginalUserDetail(userDetails: any): void {
        this.coffeeLabService.getUserDetail(userDetails.user_id, userDetails.organisation_type).subscribe((res) => {
            if (res.success) {
                this.orginalUserData = res.result;
            }
        });
    }

    getCommentsData(): void {
        this.coffeeLabService.getCommentList('recipe', this.detailsData.slug).subscribe((res: any) => {
            if (res.success) {
                this.allComments = res.result;
                this.commentData = this.allComments?.slice(0, 3);
                if (this.allComments?.length > 3) {
                    this.showCommentBtn = true;
                } else {
                    this.showCommentBtn = false;
                }
            }
        });
    }

    viewAllComments() {
        this.commentData = this.allComments;
        this.showCommentBtn = false;
    }

    setSEO() {
        let title: string;
        let description: string;
        if (this.detailsData?.name) {
            title = this.detailsData?.name.concat(' - Era of We Coffee Forum');
        } else {
            title = 'Era of We Coffee Forum';
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
                            item: `${environment.coffeeLabWeb}/${getLangRoute(this.lang)}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Brewing guides',
                            item: `${environment.coffeeLabWeb}/${getLangRoute(this.lang)}/coffee-recipes`,
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
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
