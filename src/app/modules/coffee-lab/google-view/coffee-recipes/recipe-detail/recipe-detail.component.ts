import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { MetaDespMinLength, seoVariables } from '@constants';
import { OrganizationType, PostType } from '@enums';
import { environment } from '@env/environment';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, GlobalsService, ResizeService, SEOService, StartupService } from '@services';
import { ConvertToShortDescriptionPipe } from '@shared';
import { getLangRoute, removeImages } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
    providers: [ConvertToShortDescriptionPipe],
})
export class RecipeDetailComponent extends ResizeableComponent implements OnInit {
    readonly PostType = PostType;
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
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

    initialized = false;
    loading = false;
    jsonLD: any;
    lang: any;
    orginalUserData: any;
    commentData: any[] = [];
    allComments: any[] = [];
    showCommentBtn = false;
    urlLang: string;
    showToaster = false;
    showAll = true;
    adLocation: number;
    items: ({ label: string; routerLink: string } | { label: any; routerLink?: undefined })[];
    stickySecData: any;

    constructor(
        @Inject(DOCUMENT) private doc,
        @Inject(PLATFORM_ID) private platformId: object,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private globalsService: GlobalsService,
        private router: Router,
        private seoService: SEOService,
        private startupService: StartupService,
        protected resizeService: ResizeService,
        private translator: TranslateService,
        private convertToShortDescription: ConvertToShortDescriptionPipe,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.activatedRoute.parent.parent.params.subscribe((res) => {
            this.urlLang = res.lang;
        });
        this.activatedRoute.params.subscribe((params) => {
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.getDetails();
            }
            this.getRecipeList();
            if (isPlatformBrowser(this.platformId)) {
                if (this.isMobile$) {
                    this.showAll = false;
                    this.catchScrollEvent();
                }
                window.scrollTo(0, 0);
            }
        });
        this.initialized = true;
    }

    catchScrollEvent() {
        if (isPlatformBrowser(this.platformId) && this.isMobile$) {
            const scrollEvent = fromEvent(window, 'scroll')
                .pipe(debounceTime(100))
                .pipe(takeUntil(this.unsubscribeAll$))
                .subscribe((res) => {
                    if (window.scrollY > 10) {
                        scrollEvent.unsubscribe();
                        this.showAll = true;
                        this.detectChanges();
                    }
                });
        }
    }

    getUserData() {
        this.detailsData.organisation_type = this.detailsData.organisation_type.toLowerCase() as OrganizationType;
        this.coffeeLabService
            .getUserDetail(this.detailsData.user_id, this.detailsData.organisation_type)
            .subscribe((res) => {
                if (res.success) {
                    this.stickySecData = res.result;
                }
            });
    }

    onRealtedRoute(langCode: string, slug: string) {
        return `/${getLangRoute(langCode)}/coffee-recipes/${slug}`;
    }

    getRecipeList() {
        this.coffeeLabService
            .getPopularList(
                PostType.RECIPE,
                {
                    count: 7,
                },
                this.urlLang === 'pt-br' ? 'pt' : this.urlLang,
            )
            .subscribe((res) => {
                if (res.success) {
                    this.relatedData = (res.result || [])
                        .filter((item) => item && item?.slug !== this.idOrSlug)
                        .slice(0, 6);
                }
            });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails(PostType.RECIPE, this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                if (getLangRoute(res.result.lang_code) !== this.urlLang) {
                    this.router.navigateByUrl('/error');
                } else {
                    this.detailsData = res.result;
                    this.items = [
                        { label: this.translator.instant('the_coffee_lab'), routerLink: '/' },
                        {
                            label: this.translator.instant('brewing_guides'),
                            routerLink: `/${this.urlLang}/coffee-recipes`,
                        },
                        {
                            label: this.convertToShortDescription.transform(this.detailsData?.name, 4),
                        },
                    ];
                    this.adLocation = Math.floor(this.detailsData?.steps?.length / 2);
                    if (isPlatformServer(this.platformId)) {
                        this.detailsData.description = removeImages(res.result?.description);
                    }
                    this.lang = res.result.lang_code;
                    this.startupService.load(this.lang || 'en');
                    this.getAllData();
                    this.getUserData();
                    this.setSEO();
                    if (isPlatformServer(this.platformId)) {
                        this.setSchemaMackup();
                    }
                }
            } else {
                this.router.navigate(['/error']);
            }
            this.loading = false;
            this.detectChanges();
        });
    }

    getAllData() {
        const promises = [];
        if (this.detailsData?.original_recipe_state && this.detailsData?.original_recipe_state === 'ACTIVE') {
            promises.push(
                new Promise((resolve) => this.getOriginalUserDetail(this.detailsData.original_details, resolve)),
            );
        }
        promises.push(new Promise((resolve) => this.getCommentsData(resolve)));
        Promise.all(promises).finally(() => this.detectChanges());
    }

    getOriginalUserDetail(userDetails: any, resolve): void {
        this.coffeeLabService.getUserDetail(userDetails.user_id, userDetails.organisation_type).subscribe((res) => {
            if (res.success) {
                this.orginalUserData = res.result;
            }
            resolve();
        });
    }

    getCommentsData(resolve): void {
        this.coffeeLabService.getCommentList(PostType.RECIPE, this.detailsData.slug).subscribe((res: any) => {
            if (res.success) {
                this.allComments = res.result;
                this.commentData = this.allComments?.slice(0, 3);
                if (this.allComments?.length > 3) {
                    this.showCommentBtn = true;
                } else {
                    this.showCommentBtn = false;
                }
            }
            resolve();
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
        if (this.detailsData?.stripped_description) {
            if (this.detailsData?.stripped_description.length < MetaDespMinLength) {
                description = this.detailsData?.stripped_description.concat(
                    ' - Era of We A global coffee marketplace and community that brings together all members of the supply chain',
                );
            } else {
                description = this.detailsData?.stripped_description;
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
                            item: `${environment.coffeeLabWeb}${getLangRoute(this.lang)}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Brewing guides',
                            item: `${environment.coffeeLabWeb}${getLangRoute(this.lang)}/coffee-recipes`,
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
                    description: this.detailsData?.stripped_description,
                    image: { '@type': 'ImageObject', url: this.detailsData?.cover_image_url, height: 494, width: 1144 },
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
                            url: `${this.doc.URL}#step${index + 1}`,
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

    toastCalled(event) {
        if (event) {
            this.showToaster = true;
        }
    }

    detectChanges() {
        if (this.initialized) {
            this.cdr.detectChanges();
        }
    }
}
