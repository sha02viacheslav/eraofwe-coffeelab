import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostType } from '@enums';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
    ssoWeb = environment.ssoWeb;
    readonly PostType = PostType;
    @Input() pages: number;
    @Input() type: PostType;
    @Input() categories: any[] = [];
    @Input() related = false;
    @Input() showBorderBottom = true;
    relatedData = [];
    isLoading = false;
    constructor(
        @Inject(DOCUMENT) private document: Document,
        public coffeeLabService: CoffeeLabService,
        private route: ActivatedRoute,
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
        const categories = [];
        this.categories?.filter((item: any) => categories.push(item.parent_id));
        this.coffeeLabService
            .getForumList(this.type, {
                page: 1,
                per_page: 15,
                category_id: categories,
                sort_by: 'posted_at',
                sort_order: 'desc',
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.relatedData = this.type === PostType.QA ? res.result?.questions : res.result;
                    this.isLoading = false;
                }
            });
    }

    getLink(item: any) {
        return `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/${
            this.type === 'question' ? 'qa-forum' : 'articles'
        }/${item.slug}`;
    }

    gotoSignup() {
        this.document.location.href = `${environment.ssoWeb}/sign-up`;
    }
}
