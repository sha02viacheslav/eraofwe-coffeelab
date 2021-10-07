import { Component, Input, OnInit } from '@angular/core';
import { OrganizationType, PostType } from '@enums';
import { CoffeeLabService, GlobalsService } from '@services';

@Component({
    selector: 'app-user-posts',
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
    readonly PostType = PostType;
    @Input() postType: PostType;
    @Input() queryUserId: number;
    @Input() orgType: OrganizationType;
    posts: any[] = [];
    isLoading = true;

    totalRecords = 0;
    page = 1;
    rows = 6;

    constructor(private coffeeLabService: CoffeeLabService, private globalsService: GlobalsService) {}

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts(): void {
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            page: this.page,
            per_page: this.rows,
        };
        this.isLoading = true;
        let requestApi;
        if (this.queryUserId) {
            requestApi = this.coffeeLabService.getForumList(this.postType, {
                ...params,
                user_id: this.queryUserId,
                organization_type: this.orgType,
            });
        }
        requestApi.subscribe((res) => {
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
        });
    }

    paginate(event: any) {
        this.page = event.page + 1;
        this.getPosts();
    }
}
