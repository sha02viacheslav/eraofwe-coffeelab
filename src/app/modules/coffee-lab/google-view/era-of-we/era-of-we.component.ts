import { Component, OnInit, Inject } from '@angular/core';
import { CoffeeLabService, GlobalsService, ResizeService, SEOService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { SeoDescription, SeoTitle } from '@constants';
import { RouterSlug } from '@enums';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../components/signup-modal/signup-modal.component';
import { ResizeableComponent } from '@base-components';
import { getLangRoute } from '@utils';

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
    translationsList: any[] = [
        {
            label: 'Yes',
            value: true,
        },
        {
            label: 'No',
            value: false,
        },
    ];
    orderList: any[] = [
        {
            label: 'Latest',
            value: 'latest',
        },
        {
            label: 'Oldest',
            value: 'oldest',
        },
    ];
    constructor(
        private coffeeLabService: CoffeeLabService,
        private globalsService: GlobalsService,
        private seoService: SEOService,
        protected resizeService: ResizeService,
        private toastService: ToastrService,
        public dialogSrv: DialogService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.setSEO();
        this.getData();
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
                    this.data = res.result ?? [];
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
        const title = SeoTitle[this.coffeeLabService.currentForumLanguage][RouterSlug.EOW];
        const description = SeoDescription[this.coffeeLabService.currentForumLanguage][RouterSlug.EOW];
        this.seoService.setSEO(title, description);
    }

    getLink(item) {
        const url = `/${getLangRoute(item.language)}/articles/${item.slug}`;
        return item.cardType === 'forum'
            ? url
            : `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/articles`;
    }

    onFocus(event) {
        event.stopPropagation();
        event.preventDefault();
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
