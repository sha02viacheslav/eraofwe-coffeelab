import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostType } from '@enums';
import { CoffeeLabService } from '@services';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-error-post-not-found',
    templateUrl: './post-not-found.component.html',
    styleUrls: ['./post-not-found.component.scss'],
})
export class PostNotFoundComponent implements OnInit {
    readonly PostType = PostType;
    tabMenuItems = [];
    selectedTab = 0;
    data: any;
    isRecipe: boolean;
    isLoading: boolean;
    categorySlugs: any[];
    constructor(
        private coffeeLabService: CoffeeLabService,
        private activateRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
    ) {
        this.activateRoute.queryParams.subscribe((res: any) => {
            this.isRecipe = res.isRecipe;
            this.tabMenuItems = [];
            if (!this.isRecipe) {
                this.tabMenuItems = [
                    { label: 'question_answers', postType: PostType.QA },
                    { label: 'posts', postType: PostType.ARTICLE },
                ];
            } else {
                this.tabMenuItems = [{ label: 'brewing_guides', postType: PostType.RECIPE }];
            }
        });
    }

    ngOnInit(): void {
        this.coffeeLabService.postNotFoundCategories.subscribe((res) => {
            this.categorySlugs = res;
        });
        this.getPosts(0);
    }

    handleChange(event) {
        this.getPosts(event.index);
    }

    getPosts(index): void {
        let type: string;
        if (index === 0) {
            if (this.isRecipe) {
                type = PostType.RECIPE;
            } else {
                type = PostType.QA;
            }
        } else {
            type = PostType.ARTICLE;
        }
        console.log(type);
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            category_id: this.categorySlugs,
            page: 1,
            per_page: type === PostType.QA ? 6 : 3,
        };
        this.isLoading = true;
        this.coffeeLabService
            .getForumList(type, params, this.coffeeLabService.currentForumLanguage)
            .subscribe((res) => {
                if (res.success && res.result) {
                    this.data = type === PostType.QA ? res.result?.questions : res.result;
                } else {
                    this.data = [];
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            });
    }

    getLink(item: any, type: string) {
        return `/en/${type}/${item.slug}`;
    }
}
