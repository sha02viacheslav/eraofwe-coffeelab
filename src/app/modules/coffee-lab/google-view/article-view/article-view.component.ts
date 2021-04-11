import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.scss'],
})
export class ArticleViewComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.idOrSlug = params.idOrSlug;
            this.getArticleList();
            if (this.idOrSlug) {
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {}

    getArticleList() {
        this.coffeeLabService.getForumList('article').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 5);
                if (!this.idOrSlug) {
                    this.router.navigate([`/coffee-lab/article/${res.result[0].slug}`]);
                }
            }
        });
    }

    getDetails() {
        this.coffeeLabService.getForumDetails('article', this.idOrSlug).subscribe((res: any) => {
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
