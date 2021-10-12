import { Component, OnInit } from '@angular/core';
import { CoffeeLabService, GlobalsService, ResizeService, SEOService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ResizeableComponent } from '@base-components';
import { getLangRoute } from '@utils';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-era-of-we',
    templateUrl: './era-of-we.component.html',
    styleUrls: ['./era-of-we.component.scss'],
})
export class EraOfWeComponent extends ResizeableComponent implements OnInit {
    data: any[] = [];
    isLoading = false;
    keyword = '';
    isAvailableTranslation?: any;
    selectedOrder = '';
    totalRecords = 0;
    translationsList: any[] = [];
    orderList: any[] = [];
    constructor(
        private coffeeLabService: CoffeeLabService,
        private globalsService: GlobalsService,
        private route: ActivatedRoute,
        private seoService: SEOService,
        private toastService: ToastrService,
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
        this.route.paramMap.subscribe((params) => {
            if (params.has('lang')) {
                this.getData();
            }
        });
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            query: this.keyword,
            translations_available: this.isAvailableTranslation,
            sort_order: this.selectedOrder === 'latest' || this.selectedOrder === '' ? 'desc' : 'asc',
            is_era_of_we: true,
        };

        this.coffeeLabService
            .getForumList('article', params, this.coffeeLabService.currentForumLanguage)
            .subscribe((res) => {
                if (res.success) {
                    this.data = res.result ? res.result : [];
                    this.totalRecords = res.result_info.total_count;
                    this.data.map((item) => {
                        item.content = this.globalsService.getJustText(item.content);
                        return item;
                    });
                } else {
                    this.toastService.error('Cannot get Articles data');
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
