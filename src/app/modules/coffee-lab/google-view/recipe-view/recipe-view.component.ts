import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';

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

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.idOrSlug = params.idOrSlug;
            this.getRecipeList();
            if (this.idOrSlug) {
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {}

    getRecipeList() {
        this.coffeeLabService.getForumList('recipe').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 5);
                if (!this.idOrSlug) {
                    this.router.navigate([`/recipe/${res.result[0].slug}`]);
                }
            }
        });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('recipe', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
                this.jsonLD = {
                    '@context': 'https://schema.org',
                    '@type': 'DiscussionForumPosting',
                    '@id': `${environment.coffeeLabWeb}recipe/${this.detailsData.slug}`,
                    headline: res.result.name,
                    author: {
                        '@type': 'Person',
                        name: this.detailsData.posted_user,
                    },
                };
            }
            this.loading = false;
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
