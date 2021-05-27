import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-articles-view',
    templateUrl: './articles-view.component.html',
    styleUrls: ['./articles-view.component.scss'],
})
export class ArticlesViewComponent implements OnInit, OnDestroy {
    keyword?: string;
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
    isAvailableTranslation?: any;
    selectedOrder = 'latest';
    articlesData: any[] = [];
    displayData: any[] = [];
    isLoading = false;
    pageDesc: string | undefined;
    organizationId: any;
    destroy$: Subject<boolean> = new Subject<boolean>();
    forumLanguage: string;
    totalRecords = 0;
    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
        private cookieService: CookieService,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.organizationId = +this.cookieService.get('roaster_id');
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getData();
        });
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            query: this.keyword,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' ? 'desc' : 'asc',
        };

        this.coffeeLabService.getForumList('article', params, this.forumLanguage).subscribe((res) => {
            if (res.success) {
                this.articlesData = res.result ?? [];
                this.totalRecords = this.articlesData.length;
                this.displayData = this.articlesData.slice(0, 9);
                this.articlesData.map((item) => {
                    item.content = this.getJustText(item.content);
                    return item;
                });
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    getJustText(content: any) {
        const contentElement = document.createElement('div');
        contentElement.innerHTML = content;
        const images = contentElement.querySelectorAll('img');
        images.forEach((image) => {
            image.parentNode.removeChild(image);
        });
        return contentElement.innerHTML;
    }

    paginate(event: any) {
        this.displayData = this.articlesData.slice(event.first, event.first + event.rows);
    }

    getLink(item) {
        const url = `${item.language === 'en' || !item.language ? '' : item.language}/article/${item.slug}`;
        return url;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
