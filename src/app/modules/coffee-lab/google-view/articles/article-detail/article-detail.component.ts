import { Component, OnInit, Inject } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { CoffeeLabService, SEOService, I18NService, GlobalsService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { getJustText } from '@utils';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    loading = true;
    jsonLD: any;
    lang: any;
    previousUrl: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private seoService: SEOService,
        private location: Location,
        private toastService: ToastrService,
        private i18nService: I18NService,
        private globalsService: GlobalsService,
        @Inject(DOCUMENT) private doc,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.lang = params.lang;
                this.getDetails();
            }
            if (!this.relatedData?.length) {
                this.getArticleList();
            }
        });
    }

    ngOnInit(): void {
        this.previousUrl = this.globalsService.previousUrl;
    }

    getArticleList() {
        this.coffeeLabService.getForumList('article').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 3);
                if (!this.idOrSlug) {
                    this.router.navigate([`/article/${this.relatedData[0].slug}`]);
                }
            }
        });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('article', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
                if (this.lang && this.lang !== res.result.language) {
                    this.location.back();
                } else {
                    this.globalsService.setLimitCounter();
                    this.i18nService.use(this.lang || 'en');
                    this.setSEO();
                }
            } else {
                this.toastService.error('The article is not exist.');
                this.router.navigate(['/error']);
            }
            this.loading = false;
        });
    }

    setSEO() {
        this.seoService.setPageTitle(this.detailsData?.title);
        this.seoService.setMetaData('description', getJustText(this.detailsData?.content));
        this.seoService.createLinkForCanonicalURL();
        this.seoService.createLinkForHreflang(this.lang || 'x-default');
        this.setSchemaMackup();
    }

    setSchemaMackup() {
        this.jsonLD = {
            '@context': 'https://schema.org',
            '@type': 'DiscussionForumPosting',
            '@id': this.doc.URL,
            headline: this.seoService.getPageTitle(),
            author: {
                '@type': 'Person',
                name: this.detailsData.user_name,
            },
        };
    }
}
