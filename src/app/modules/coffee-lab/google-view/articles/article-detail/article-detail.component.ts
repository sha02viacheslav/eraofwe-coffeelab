import { Component, OnInit, Inject } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { CoffeeLabService, SEOService, StartupService, GlobalsService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { DISCUSSIONS_FORUM } from '../../data';
import { routerMap } from '@constants';

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
    isPublic: boolean;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private seoService: SEOService,
        private location: Location,
        private toastService: ToastrService,
        private startupService: StartupService,
        private globalsService: GlobalsService,
        @Inject(DOCUMENT) private doc,
    ) {
        this.setSEO();
        this.activatedRoute.queryParams.subscribe((params) => {
            this.isPublic = params.is_public;
        });
        this.activatedRoute.params.subscribe((params) => {
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.getDetails();
            }
            if (!this.relatedData?.length) {
                this.getArticleList();
            }
        });
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    getArticleList() {
        this.coffeeLabService.getForumList('article').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 3);
            }
        });
    }

    getDetails() {
        this.loading = true;
        if (this.isPublic) {
            this.detailsData = DISCUSSIONS_FORUM.find((item) => item.slug === this.idOrSlug);
            this.loading = false;
            this.previousUrl = '/en/about-era-of-we';
        } else {
            this.coffeeLabService.getForumDetails('article', this.idOrSlug).subscribe((res: any) => {
                if (res.success) {
                    this.detailsData = res.result;
                    this.lang = res.result.language;
                    if (!this.isPublic) {
                        this.globalsService.setLimitCounter();
                    }
                    this.startupService.load(this.lang || 'en');
                    this.setSEO();
                    this.setSchemaMackup();
                    this.previousUrl = `/${this.lang}/${this.lang === 'en' ? 'articles' : routerMap.sv['articles']}`;
                } else {
                    this.toastService.error('The article is not exist.');
                    this.router.navigate(['/error']);
                }
                this.loading = false;
            });
        }
    }

    setSEO() {
        this.seoService.setPageTitle(this.detailsData?.title || 'Era of We - The Coffee Lab');
        this.seoService.setMetaData(
            'description',
            this.detailsData?.content
                ? this.globalsService.getJustText(this.detailsData?.content)
                : 'Era of We - Article for Coffee',
        );
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
                            name: 'Posts',
                            item: `${environment.coffeeLabWeb}/${this.lang}/articles`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 3,
                            name: this.detailsData?.title,
                        },
                    ],
                },
                {
                    '@type': 'Article',
                    '@id': this.doc.URL,
                    headline: this.seoService.getPageTitle(),
                    description: this.globalsService.getJustText(this.detailsData?.content),
                    image: this.detailsData?.cover_image_url,
                    datePublished: this.detailsData?.created_at,
                    author: {
                        '@type': 'Person',
                        name: this.detailsData.user_name,
                    },
                },
            ],
        };
    }
}
