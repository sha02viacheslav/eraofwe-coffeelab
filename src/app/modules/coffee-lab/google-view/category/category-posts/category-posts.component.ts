import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PostType } from '@enums';
import { CoffeeLabService, GlobalsService } from '@services';

@Component({
    selector: 'app-category-posts',
    templateUrl: './category-posts.component.html',
    styleUrls: ['./category-posts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPostsComponent implements OnInit {
    readonly PostType = PostType;
    @Input() postType: PostType;
    @Input() slug: string;
    @Input() showAll: boolean;
    posts: any[] = [];
    isLoading = true;

    sortOptions = [
        { label: 'latest', value: 'latest' },
        { label: 'most_answered', value: 'most_answered' },
        { label: 'oldest', value: 'oldest' },
    ];
    orderList: any[] = [
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
    ];
    filterOptions = [
        { label: 'coffee_experts', value: false },
        { label: 'coffee_consumer', value: true },
    ];
    translationsList: any[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];

    sortBy: string;
    selectedOrder: string;
    filterBy: boolean = null;
    isAvailableTranslation: boolean = null;

    totalRecords = 0;
    page = 1;
    rows = 6;

    constructor(
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private globalsService: GlobalsService,
    ) {}

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts(): void {
        const params = {
            sort_by:
                this.postType === PostType.QA
                    ? this.sortBy === 'most_answered'
                        ? 'most_answered'
                        : 'posted_at'
                    : 'created_at',

            sort_order:
                this.postType === PostType.QA
                    ? this.sortBy === 'most_answered'
                        ? 'desc'
                        : this.sortBy === 'latest' || !this.sortBy
                        ? 'desc'
                        : 'asc'
                    : this.selectedOrder === 'latest' || !this.selectedOrder
                    ? 'desc'
                    : 'asc',
            is_consumer: this.filterBy,
            translations_available: this.isAvailableTranslation,
            publish: true,
            category_slug: this.slug,
            page: this.page,
            per_page: this.rows,
        };
        this.isLoading = true;
        this.cdr.detectChanges();
        this.coffeeLabService
            .getForumList(this.postType, {
                ...params,
            })
            .subscribe((res) => {
                if (res.success) {
                    this.posts = ((this.postType === PostType.QA ? res.result?.questions : res.result) ?? []).map(
                        (item) => {
                            item.content = this.globalsService.getJustText(item.content);
                            return item;
                        },
                    );
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
