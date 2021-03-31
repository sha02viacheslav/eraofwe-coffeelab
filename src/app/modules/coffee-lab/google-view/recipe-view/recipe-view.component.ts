import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    slug: string;
    id: string;
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

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.slug = params.slug;
            this.id = params.id;
            this.getRecipeList();
            if (this.slug || this.id) {
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {}

    getRecipeList() {
        this.coffeeLabService.getForumList('recipe').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result.filter((item) => item.id !== this.id && item.slug !== this.slug);
                if (!this.slug && !this.id) {
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            slug: res.result[0].slug,
                        },
                    };
                    this.router.navigate(['/coffee-lab/recipe'], navigationExtras);
                }
            }
        });
    }

    getDetails() {
        const idOrSlug = this.slug ?? this.id;
        this.coffeeLabService.getForumDetails('recipe', idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
            }
        });
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
