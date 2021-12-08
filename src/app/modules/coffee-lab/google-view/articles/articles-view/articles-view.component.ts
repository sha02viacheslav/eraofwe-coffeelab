import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService, SEOService, ResizeService } from '@services';
import { environment } from '@env/environment';
import { ResizeableComponent } from '@base-components';
import { getLangRoute } from '@utils';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-articles-view',
    templateUrl: './articles-view.component.html',
    styleUrls: ['./articles-view.component.scss'],
})
export class ArticlesViewComponent extends ResizeableComponent implements OnInit {
    keyword?: string;
    isAvailableTranslation: any;
    selectedOrder: string;
    articlesData: any[] = [];
    isLoading = true;
    totalRecords = 0;
    rows = 9;
    page = 1;
    jsonLD: any;
    categoryList: any[] = [];
    selectedCategory = null;
    translationsList: any[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    orderList: any[] = [
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
    ];

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private route: ActivatedRoute,
        private seoService: SEOService,
        private toastService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public coffeeLabService: CoffeeLabService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.setSEO();
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                this.page = +params.get('page');
                if (this.page < 1) {
                    this.page = 1;
                }
            }
            this.refreshData();
        });
        let langPrefix = '';
        this.route.paramMap.subscribe((params) => {
            if (params.has('lang')) {
                if (langPrefix) {
                    this.refreshData();
                }
                langPrefix = params.get('lang');
            }
        });
    }

    refreshData() {
        this.getData();
        this.getCategory();
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

    getData(): void {
        const params: any = {
            query: this.keyword,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' || !this.selectedOrder ? 'desc' : 'asc',
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('article', params).subscribe((res) => {
            if (res.success) {
                this.articlesData = res.result ?? [];
                this.totalRecords = res.result_info.total_count;
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    getCategory() {
        this.coffeeLabService.getCategory(this.coffeeLabService.currentForumLanguage).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    setSEO() {
        this.translator
            .getStreamOnTranslationChange(['tcl_seo_meta_title_article', 'tcl_seo_meta_description_article'])
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((res) => {
                this.seoService.setSEO(res.tcl_seo_meta_title_article, res.tcl_seo_meta_description_article);
            });
    }

    setSchemaMackup() {
        const forumList: any[] = [];
        for (const forum of this.articlesData) {
            const itemData = {
                '@type': 'Article',
                '@id': `${environment.coffeeLabWeb}/${getLangRoute(
                    this.coffeeLabService.currentForumLanguage,
                )}/articles/${forum.slug}`,
                headline: forum.title,
                description: forum.content,
                image: forum.cover_image_url,
                datePublished: forum.created_at,
                author: {
                    '@type': 'Person',
                    name: forum.user_name,
                },
            };
            forumList.push(itemData);
        }

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
                            item: `${environment.coffeeLabWeb}/${this.coffeeLabService.currentForumLanguage}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Posts',
                        },
                    ],
                },
                ...forumList,
            ],
        };
    }
}
