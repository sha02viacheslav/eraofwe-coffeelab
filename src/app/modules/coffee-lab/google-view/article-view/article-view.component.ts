import { Component, OnInit } from '@angular/core';
import { CoffeeLabService, SEOService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';

@Component({
    selector: 'app-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.scss'],
})
export class ArticleViewComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    loading = false;
    jsonLD: any;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private seoService: SEOService,
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
                    this.router.navigate([`/article/${res.result[0].slug}`]);
                }
            }
        });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('article', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
                this.jsonLD = {
                    '@context': 'https://schema.org',
                    '@type': 'DiscussionForumPosting',
                    '@id': `${environment.coffeeLabWeb}article/${this.detailsData.slug}`,
                    headline: res.result.title,
                    author: {
                        '@type': 'Person',
                        name: this.detailsData.user_name,
                    },
                };
                this.setSEO();
            }
            this.loading = false;
        });
    }

    setSEO() {
        this.seoService.setPageTitle(this.detailsData?.title);
        this.seoService.createLinkForCanonicalURL();
        this.seoService.createLinkForHreflang();
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
