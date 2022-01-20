import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { APP_LANGUAGES } from '@constants';
import { Fields, PostType } from '@enums';
import { environment } from '@env/environment';
import { RedirectPopupComponent } from '@modules/coffee-lab/components/redirect-popup/redirect-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, ResizeService, SEOService } from '@services';
import { getCookie, getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-articles-view',
    templateUrl: './articles-view.component.html',
    styleUrls: ['./articles-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    keyword?: string;
    isAvailableTranslation: boolean = null;
    selectedOrder: string;
    articlesData: any[] = [];
    isLoading = true;
    showAll = true;
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
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private seoService: SEOService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
    ) {
        super(resizeService);

        if (isPlatformBrowser(this.platformId)) {
            if (this.isMobile$) {
                this.showAll = false;
            }
            window.scrollTo(0, 0);
        }
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

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId) && this.isMobile$) {
            const scrollEvent = fromEvent(window, 'scroll')
                .pipe(debounceTime(100))
                .pipe(takeUntil(this.unsubscribeAll$))
                .subscribe((res) => {
                    if (window.scrollY > 10) {
                        scrollEvent.unsubscribe();
                        this.showAll = true;
                        this.cdr.detectChanges();
                    }
                });
        }
        this.coffeeLabService.getIpInfo().subscribe((resp: any) => {
            APP_LANGUAGES.forEach((item) => {
                if (item.countries.includes(resp.countryCode)) {
                    if (
                        isPlatformBrowser(this.platformId) &&
                        this.coffeeLabService.currentForumLanguage !== item.value &&
                        getCookie('langChange') !== 'set'
                    ) {
                        this.dialogSrv.open(RedirectPopupComponent, {
                            data: {
                                langName: item.label.en,
                                langCode: item.value,
                                countryName: resp.countryName,
                            },
                        });
                    }
                }
            });
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
            fields: Fields.INTERMEDIATE,
        };
        this.isLoading = true;
        this.cdr.detectChanges();
        this.coffeeLabService.getForumList(PostType.ARTICLE, params).subscribe((res) => {
            if (res.success) {
                this.articlesData = res.result ?? [];
                this.totalRecords = res.result_info.total_count;
            }
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    getCategory() {
        const params = {
            language: this.coffeeLabService.currentForumLanguage,
        };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
            this.cdr.detectChanges();
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
                '@id': `${environment.coffeeLabWeb}${getLangRoute(
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
                            item: `${environment.coffeeLabWeb}${this.coffeeLabService.currentForumLanguage}`,
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
