import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterMap } from '@constants';
import { Fields, PostType } from '@enums';
import { CoffeeLabService } from '@services';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinCommunityComponent implements OnInit {
    readonly PostType = PostType;
    @Input() pages: number;
    @Input() type: PostType;
    @Input() categories: any[] = [];
    @Input() related = false;
    @Input() showBorderBottom = true;
    relatedData = [];
    isLoading = false;

    constructor(
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        public coffeeLabService: CoffeeLabService,
    ) {
        let langPrefix = '';
        this.route.paramMap.subscribe((params) => {
            if (params.has('lang')) {
                if (langPrefix) {
                    this.getQaList();
                }
                langPrefix = params.get('lang');
            }
        });
    }

    ngOnInit(): void {
        this.getQaList();
    }

    getQaList() {
        this.isLoading = true;
        const categories = (this.categories || [])?.map((item: any) => item.parent_id);
        this.coffeeLabService
            .getForumList(this.type, {
                page: 1,
                per_page: 15,
                category_id: categories,
                sort_by: 'posted_at',
                sort_order: 'desc',
                fields: Fields.BASIC,
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.relatedData = this.type === PostType.QA ? res.result?.questions : res.result;
                    this.isLoading = false;
                    this.cdr.detectChanges();
                }
            });
    }

    getLink(slug: string) {
        return `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/${
            this.type === PostType.QA ? RouterMap.en.QA : RouterMap.en.ARTICLE
        }/${slug}`;
    }
}
