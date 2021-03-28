import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.scss'],
})
export class ArticleViewComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    slug: string;
    id: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.slug = params.slug;
            this.id = params.id;
            this.getArticleList();
            if (this.slug || this.id) {
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {}

    getArticleList() {
        this.coffeeLabService.getForumList('article').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result.filter((item) => item.id !== this.id && item.slug !== this.slug);
                if (!this.slug && !this.id) {
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            slug: res.result[0].slug,
                        },
                    };
                    this.router.navigate(['/coffee-lab/article'], navigationExtras);
                }
            }
        });
    }

    getDetails() {
        const idOrSlug = this.slug ?? this.id;
        this.coffeeLabService.getForumDetails('article', idOrSlug).subscribe((res: any) => {
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
