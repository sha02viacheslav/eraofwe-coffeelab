import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { Fields } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, ResizeService, SEOService } from '@services';
import { getLangRoute } from '@utils';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-era-of-we',
    templateUrl: './era-of-we.component.html',
    styleUrls: ['./era-of-we.component.scss'],
})
export class EraOfWeComponent extends ResizeableComponent implements OnInit {
    data: any[] = [];
    isLoading = false;
    keyword = '';
    isAvailableTranslation: boolean = null;
    selectedOrder: string;
    totalRecords = 0;
    rows = 9;
    page = 1;
    translationsList: any[] = [];
    orderList: any[] = [];

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private coffeeLabService: CoffeeLabService,
        private route: ActivatedRoute,
        private seoService: SEOService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.setSEO();
        this.orderList = [
            { label: 'latest', value: 'latest' },
            { label: 'oldest', value: 'oldest' },
        ];
        this.translationsList = [
            { label: 'yes', value: true },
            { label: 'no', value: false },
        ];

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
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            query: this.keyword,
            translations_available: this.isAvailableTranslation,
            sort_order: this.selectedOrder === 'latest' || this.selectedOrder === '' ? 'desc' : 'asc',
            is_era_of_we: true,
            page: this.page,
            per_page: this.rows,
            fields: Fields.INTERMEDIATE,
        };

        this.coffeeLabService
            .getForumList('article', params, this.coffeeLabService.currentForumLanguage)
            .subscribe((res) => {
                if (res.success) {
                    this.data = res.result || [];
                    this.totalRecords = res.result_info.total_count;
                }
                this.isLoading = false;
            });
    }

    setSEO() {
        this.translator
            .getStreamOnTranslationChange(['tcl_seo_meta_title_eow', 'tcl_seo_meta_description_eow'])
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((res) => {
                this.seoService.setSEO(res.tcl_seo_meta_title_eow, res.tcl_seo_meta_description_eow);
            });
    }

    getLink(item) {
        const url = `/${getLangRoute(item.language)}/articles/${item.slug}`;
        return item.cardType === 'forum'
            ? url
            : `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/articles`;
    }
}
