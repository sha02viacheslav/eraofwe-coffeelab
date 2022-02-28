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
    tabMenuItems = [
        { label: 'question_answers', postType: PostType.QA },
        { label: 'posts', postType: PostType.ARTICLE },
        { label: 'brewing_guides', postType: PostType.RECIPE },
    ];
    selectedTab = 0;
    data: any;
    type: string;
    isLoading: boolean;
    categorySlugs: any[];
    constructor(
        private coffeeLabService: CoffeeLabService,
        private activateRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
    ) {
        this.activateRoute.queryParamMap.subscribe((res: any) => {
            this.type = res;
            this.getPosts(0);
        });
    }
    get postType(): PostType {
        return this.tabMenuItems[this.selectedTab]?.postType || PostType.QA;
    }
    ngOnInit(): void {}

    handleChange(event) {
        this.getPosts(event.index);
    }

    getPosts(index): void {
        this.coffeeLabService.postNotFoundCategories.subscribe((res) => {
            this.categorySlugs = res;
        });
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
            // category_slug: this.categorySlugs,
            page: 1,
            per_page: index === 0 ? 6 : 3,
        };
        this.isLoading = true;
        // this.tabMenuItems = [];
        this.coffeeLabService
            .getForumList(index === 0 ? PostType.QA : index === 1 ? PostType.ARTICLE : PostType.RECIPE, params, 'en')
            .subscribe((res) => {
                if (res.success && res.result) {
                    this.data = index === 0 ? res.result?.questions : res.result;
                } else {
                    this.data = [];
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            });
    }

    // getPosts(): void {
    //     const params = {
    //         sort_by: 'created_at',
    //         sort_order: 'desc',
    //         publish: true,
    //         page: 1,
    //         per_page: 3,
    //     };
    //     forkJoin([
    //         this.coffeeLabService.getForumList(PostType.QA, params),
    //         this.coffeeLabService.getForumList(PostType.ARTICLE, params),
    //         this.coffeeLabService.getForumList(PostType.RECIPE, params),
    //     ]).subscribe((res: any) => {
    //         // const questions = res[0]?.result?.questions || [];
    //         // const articles = res[1]?.result || [];
    //         // const recipes = res[2]?.result || [];
    //         this.data = this.type === PostType.QA ? res.result?.questions : res.result;
    //         // this.searchResult = {
    //         //     questions,
    //         //     articles,
    //         //     recipes,
    //         //     qa_total_count: res[0]?.result_info.total_count || 0,
    //         //     article_total_count: res[1]?.result_info.total_count || 0,
    //         //     recipe_total_count: res[2]?.result_info.total_count || 0,
    //         // };
    //         this.tabMenuItems = [];
    //         // if (this.searchResult.questions.length > 0) {
    //         //     this.tabMenuItems.push({ label: 'question_answers', postType: PostType.QA });
    //         // }
    //         // if (this.searchResult.articles.length > 0) {
    //         //     this.tabMenuItems.push({ label: 'posts', postType: PostType.ARTICLE });
    //         // }
    //         // if (this.searchResult.recipes.length > 0) {
    //         //     this.tabMenuItems.push({ label: 'brewing_guides', postType: PostType.RECIPE });
    //         // }
    //         this.selectedTab = 0;
    //         // this.clearFilters();
    //         // this.getCategory();
    //         // this.coffeeLabService.searchResult.next(this.searchResult);
    //         // this.isFirstLoading = false;
    //     });
    // }

    // onTabChange(event) {
    //     this.selectedTab = event.index;
    // }

    getLink(item: any, type: string) {
        return `/en/${type}/${item.slug}`;
    }
}
