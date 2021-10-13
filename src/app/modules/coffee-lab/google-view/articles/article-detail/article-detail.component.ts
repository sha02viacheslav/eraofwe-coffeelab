import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CoffeeLabService, SEOService, StartupService, GlobalsService, ResizeService } from '@services';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { RouterMap } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';
import { getLangRoute } from '@utils';
import { ResizeableComponent } from '@base-components';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss'],
    providers: [MessageService],
})
export class ArticleDetailComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    readonly PostType = PostType;
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    loading = true;
    jsonLD: any;
    lang: any;
    previousUrl: string;
    // buttonList = [{ button: 'Roasting' }, { button: 'Coffee grinding' }, { button: 'Milling' }, { button: 'Brewing' }];
    addComment = false;
    stickySecData: any;
    orginalUserData: any;
    commentData: any;
    allComments: any;
    showCommentBtn = false;
    orignalArticleName: string;
    urlLang: string;
    showAll = true;

    constructor(
        @Inject(DOCUMENT) private doc,
        @Inject(PLATFORM_ID) private platformId: object,
        private activatedRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private seoService: SEOService,
        private startupService: StartupService,
        private messageService: MessageService,
        private toastService: ToastrService,
        protected resizeService: ResizeService,
        public globalsService: GlobalsService,
        public router: Router,
    ) {
        super(resizeService);
        this.activatedRoute.params.subscribe((params) => {
            this.urlLang = params?.lang;
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.getDetails();
            }
            if (!this.relatedData?.length) {
                this.getArticleList();
            }
        });

        if (isPlatformBrowser(this.platformId) && this.isMobile$) {
            this.showAll = false;
            window.scrollTo(0, 0);
        }
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId) && this.isMobile$) {
            const scrollEvent = fromEvent(window, 'scroll')
                .pipe(debounceTime(100))
                .pipe(takeUntil(this.unsubscribeAll$))
                .subscribe((res) => {
                    if (window.scrollY > 10) {
                        scrollEvent.unsubscribe();
                        this.showAll = true;
                    }
                });
        }
    }

    getArticleList(): any {
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            publish: true,
        };
        this.coffeeLabService.getPopularList('article', params).subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result
                    .filter((item: any) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 4);
            }
        });
    }

    onRealtedRoute(langCode, slug) {
        this.router.navigateByUrl(`/en/articles/${slug}`);
        window.scrollTo(0, 0);
    }

    viewAllComments() {
        this.commentData = this.allComments;
        this.showCommentBtn = false;
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('article', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                if (getLangRoute(res.result.language) !== this.urlLang) {
                    this.router.navigateByUrl('/error');
                } else {
                    this.detailsData = {
                        ...res.result,
                        articleContentText: this.globalsService.getJustText(res.result?.content),
                    };
                    this.lang = res.result.language;

                    if (res.result?.is_era_of_we) {
                        this.previousUrl = `/${getLangRoute(this.lang)}/${
                            (RouterMap[this.lang] || RouterMap.en)[RouterSlug.EOW]
                        }`;
                    } else {
                        this.previousUrl = `/${getLangRoute(this.lang)}/${
                            (RouterMap[this.lang] || RouterMap.en)[RouterSlug.ARTICLE]
                        }`;
                        this.globalsService.setLimitCounter();
                    }
                    this.startupService.load(this.lang || 'en');
                    if (
                        this.detailsData?.original_article_state &&
                        this.detailsData?.original_article_state === 'ACTIVE'
                    ) {
                        this.getOriginalUserDetail(this.detailsData.original_article);
                    }
                    this.getUserDetail(this.detailsData);
                    this.setSEO();
                    this.getCommentsData();
                    this.messageService.clear();
                    this.messageService.add({
                        key: 'translate',
                        severity: 'success',
                        closable: false,
                    });

                    if (isPlatformServer(this.platformId)) {
                        this.setSchemaMackup();
                    }
                }
            } else {
                this.toastService.error('The article is not exist.');
                this.router.navigate(['/error']);
            }
            this.loading = false;
        });
    }

    setSEO() {
        let title: string;
        let description: string;
        if (this.detailsData?.title) {
            title = this.detailsData?.title.concat(' - Era of We Coffee Marketplace');
        } else {
            title = 'Era of We Coffee Marketplace';
        }
        if (this.detailsData?.content) {
            if (this.detailsData?.articleContentText.length < 60) {
                description = this.detailsData?.content.concat(
                    ' - Era of We A global coffee marketplace and community that brings together all members of the supply chain',
                );
            } else {
                description = this.detailsData?.articleContentText;
            }
        } else {
            description =
                'Era of We A global coffee marketplace and community that brings together all members of the supply chain';
        }

        this.seoService.setSEO(title, description);
    }

    setSchemaMackup() {
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
                            item: `${environment.coffeeLabWeb}/${getLangRoute(this.lang)}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Posts',
                            item: `${environment.coffeeLabWeb}/${getLangRoute(this.lang)}/articles`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 3,
                            name: this.detailsData?.title,
                        },
                    ],
                },
                {
                    '@type': 'Article',
                    '@id': this.doc.URL,
                    headline: this.seoService.getPageTitle(),
                    description: this.detailsData?.articleContentText.substr(0, 160),
                    image: this.detailsData?.cover_image_url,
                    datePublished: this.detailsData?.created_at,
                    author: {
                        '@type': 'Person',
                        name: this.detailsData.user_name,
                    },
                },
            ],
        };
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }

    getOriginalUserDetail(userDetails: any): void {
        this.coffeeLabService.getUserDetail(userDetails.user_id, userDetails.organisation_type).subscribe((res) => {
            if (res.success) {
                this.orginalUserData = res.result;
            }
        });
    }

    getUserDetail(userDetails: any): void {
        this.coffeeLabService.getUserDetail(userDetails.user_id, userDetails.organisation_type).subscribe((res) => {
            if (res.success) {
                this.stickySecData = res.result;
            }
        });
    }

    getCommentsData(): void {
        this.coffeeLabService.getCommentList('article', this.detailsData.slug).subscribe((res: any) => {
            if (res.success) {
                this.allComments = res.result;
                this.commentData = this.allComments?.slice(0, 3);
                if (this.allComments?.length > 3) {
                    this.showCommentBtn = true;
                } else {
                    this.showCommentBtn = false;
                }
            }
        });
    }
}
