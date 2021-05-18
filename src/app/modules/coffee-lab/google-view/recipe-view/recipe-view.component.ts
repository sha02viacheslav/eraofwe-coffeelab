import { Component, OnInit } from '@angular/core';
import { CoffeeLabService, SEOService, I18NService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { getJustText } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    infoData: any[] = [
        {
            icon: 'assets/images/expertise-level.svg',
            label: 'Expertise level',
            key: 'expertise',
        },
        {
            icon: 'assets/images/preparation-time.svg',
            label: 'Preparation Time',
            key: 'preparation_time',
            key2: 'preparation_time_unit',
        },
        {
            icon: 'assets/images/cooking-time.svg',
            label: 'Cooking Time',
            key: 'cooking_time',
            key2: 'cooking_time_unit',
        },
        {
            icon: 'assets/images/servings.svg',
            label: 'Serving',
            key: 'serves',
        },
    ];
    ingredientsData: any[] = [
        {
            label: 'Instant Coffee',
            value: '3 tbsp',
        },
        {
            label: 'Sugar',
            value: '2 tbsp',
        },
        {
            label: 'Milk',
            value: '400~500 ml',
        },
        {
            label: 'Ice',
            value: '5-6',
        },
    ];
    loading = false;
    jsonLD: any;
    lang: any;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private seoService: SEOService,
        private toastService: ToastrService,
        private location: Location,
        private i18nService: I18NService,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.idOrSlug = params.idOrSlug;
            this.lang = params.lang;
            this.getRecipeList();
            this.getDetails();
        });
    }

    ngOnInit(): void {}

    getRecipeList() {
        this.coffeeLabService.getForumList('recipe').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 5);
            }
        });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('recipe', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
                if (this.lang && this.lang !== res.result.lang_code) {
                    this.toastService.error('Language is not matched.');
                    this.location.back();
                } else {
                    this.i18nService.use(this.lang || 'en');
                    this.setSEO();
                }
            } else {
                this.toastService.error('The recipe is not exist.');
                this.router.navigate(['/error']);
            }
            this.loading = false;
        });
    }

    setSEO() {
        this.seoService.setPageTitle(this.detailsData?.name);
        this.seoService.setMetaData('description', getJustText(this.detailsData?.description));
        this.seoService.createLinkForCanonicalURL();
        this.seoService.createLinkForHreflang(this.lang || 'x-default');
        this.jsonLD = this.seoService.getJsonLD(this.detailsData.posted_user);
    }

    getMenuItemsForItem(item) {
        const items = [
            {
                label: 'Share',
                command: () => {
                    this.onShare(item);
                },
            },
            {
                label: 'Save Post',
                command: () => {
                    this.onSavePost(item);
                },
            },
            {
                label: 'Translate answer',
                command: () => {
                    this.onTranslate(item);
                },
            },
        ];
        return [{ items }];
    }

    onShare(postItem) {}
    onSavePost(postItem) {}
    onTranslate(postItem) {}
}
