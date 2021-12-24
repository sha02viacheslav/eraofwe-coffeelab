import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { CoffeeLabService, GlobalsService, ResizeService } from '@services';

@Component({
    selector: 'app-category-qa',
    templateUrl: './category-qa.component.html',
    styleUrls: ['./category-qa.component.scss'],
})
export class CategoryQAComponent extends ResizeableComponent implements OnInit {
    sortOptions = [
        { label: 'latest', value: 'latest' },
        { label: 'most_answered', value: 'most_answered' },
        { label: 'oldest', value: 'oldest' },
    ];
    filterOptions = [
        { label: 'coffee_experts', value: false },
        { label: 'coffee_consumer', value: true },
    ];
    showAll = true;
    isBrowser = false;
    sortBy: string;
    filterBy: any;
    slug: any;
    totalRecords = 0;
    page = 1;
    rows = 6;
    posts: any;
    isLoading: boolean;
    topWriters: any;
    otherCategories: any[];

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
        this.getAllTopWriters();
    }

    getPosts(): void {
        const params = {
            sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' || !this.sortBy ? 'desc' : 'asc',
            is_consumer: this.filterBy,
            publish: true,
            category_slug: this.slug,
            page: this.page,
            per_page: this.rows,
        };
        this.isLoading = true;
        this.cdr.detectChanges();
        this.coffeeLabService
            .getForumList('question', {
                ...params,
            })
            .subscribe((res) => {
                if (res.success) {
                    this.posts = (res.result?.questions || []).map((item) => {
                        item.content = this.globalsService.getJustText(item.content);
                        return item;
                    });
                    this.totalRecords = res.result_info.total_count;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            });
    }

    getAllTopWriters() {
        this.coffeeLabService.getTopWriters({ count: 4 }).subscribe((res) => {
            if (res.success) {
                this.topWriters = res.result || [];
            }
            this.cdr.detectChanges();
        });
        this.coffeeLabService.otherCategories.subscribe((res) => {
            this.otherCategories = res;
        });
    }

    paginate(event: any) {
        this.page = event.page + 1;
        this.getPosts();
    }
}
