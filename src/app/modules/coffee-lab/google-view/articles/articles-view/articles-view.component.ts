import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService, GlobalsService, SEOService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
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
    destroy$: Subject<boolean> = new Subject<boolean>();
    forumLanguage: string;
    totalRecords = 0;
    jsonLD: any;

    constructor(
        public coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
        public dialogSrv: DialogService,
        private globalsService: GlobalsService,
        @Inject(DOCUMENT) private document: Document,
        private seoService: SEOService,
    ) {}

    ngOnInit(): void {
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
                this.articlesData.map((item) => {
                    item.content = this.getJustText(item.content);
                    return item;
                });
                this.displayData = this.articlesData.slice(0, 9);
                this.setSEO();
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    getJustText(content: any) {
        const contentElement = this.document.createElement('div');
        contentElement.innerHTML = content;
        const images = contentElement.querySelectorAll('img');
        images.forEach((image) => {
            image.parentNode.removeChild(image);
        });
        return contentElement.innerHTML;
    }

    paginate(event: any) {
        this.displayData = this.articlesData.slice(event.first, event.first + event.rows);
        this.setSchemaMackup();
    }

    getLink(item) {
        const url = `${item.language}/article/${item.slug}`;
        return url;
    }

    gotoDetailPage(item: any) {
        if (this.globalsService.getLimitCounter() > 0) {
            this.router.navigate([this.getLink(item)]);
        } else {
            this.dialogSrv.open(SignupModalComponent, {
                data: {
                    isLimit: true,
                },
                showHeader: false,
                styleClass: 'signup-dialog',
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    setSEO() {
        this.seoService.setPageTitle('Era of We - The Coffee Lab Posts');
        this.seoService.setMetaData('description', 'Posts for Coffee Lab');
        this.seoService.createLinkForCanonicalURL();
        this.seoService.createLinkForHreflang(this.forumLanguage || 'x-default');
        this.setSchemaMackup();
    }

    setSchemaMackup() {
        const forumList: any[] = [];
        for (const forum of this.displayData) {
            const itemData = {
                '@type': 'Article',
                '@id': `${environment.coffeeLabWeb}/${this.forumLanguage}/article/${forum.slug}`,
                headline: forum.title,
                description: this.globalsService.getJustText(forum.content),
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
                            item: `${environment.coffeeLabWeb}/${this.forumLanguage}/overview`,
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
