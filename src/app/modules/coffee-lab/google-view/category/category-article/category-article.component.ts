import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { CoffeeLabService, GlobalsService, ResizeService } from '@services';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-category-article',
    templateUrl: './category-article.component.html',
    styleUrls: ['./category-article.component.scss'],
})
export class CategoryArticleComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    filterBy: boolean = null;
    isAvailableTranslation: boolean = null;
    orderList: any[] = [
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
    ];
    translationsList: any[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    selectedOrder: string;
    slug: any;
    isBrowser = false;
    showAll = true;
    posts: any;
    isLoading = false;
    totalRecords = 0;
    page = 1;
    rows = 6;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        protected resizeService: ResizeService,
        private activatedRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
        private globalsService: GlobalsService,
        private cdr: ChangeDetectorRef,
    ) {
        super(resizeService);
        this.slug = this.activatedRoute.parent.snapshot.params.category;
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.isBrowser = true;
            if (this.isMobile$) {
                this.showAll = false;
            }
            window.scrollTo(0, 0);
        }
        this.getPosts();
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
    }

    getPosts(): void {
        const params = {
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' || !this.selectedOrder ? 'desc' : 'asc',
            is_consumer: this.filterBy,
            publish: true,
            translations_available: this.isAvailableTranslation,
            category_slug: this.slug,
            page: this.page,
            per_page: this.rows,
        };
        this.isLoading = true;
        this.cdr.detectChanges();
        this.coffeeLabService
            .getForumList('article', {
                ...params,
            })
            .subscribe((res) => {
                if (res.success) {
                    this.posts = (res.result || []).map((item) => {
                        item.content = this.globalsService.getJustText(item.content);
                        return item;
                    });
                    this.totalRecords = res.result_info.total_count;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            });
    }

    paginate(event: any) {
        this.page = event.page + 1;
        this.getPosts();
    }
}
