import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { RouterMap } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { environment } from '@env/environment';
import { CoffeeLabService, GlobalsService, ResizeService, SEOService, StartupService } from '@services';
import { getLangRoute } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss'],
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    readonly PostType = PostType;
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    loading = false;
    jsonLD: any;
    lang: any;
    previousUrl: string;
    addComment = false;
    stickySecData: any;
    orginalUserData: any;
    commentData: any;
    allComments: any;
    showCommentBtn = false;
    orignalArticleName: string;
    urlLang: string;
    showAll = true;
    showToaster = false;

    constructor(
        @Inject(DOCUMENT) private doc,
        @Inject(PLATFORM_ID) private platformId: object,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private globalsService: GlobalsService,
        private messageService: MessageService,
        private router: Router,
        private seoService: SEOService,
        private startupService: StartupService,
        private toastService: ToastrService,
        protected resizeService: ResizeService,
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

        if (isPlatformBrowser(this.platformId)) {
            if (this.isMobile$) {
                this.showAll = false;
            }
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
                        this.cdr.detectChanges();
                    }
                });
        }
    }

    getArticleList(): any {
        this.relatedData = [];
        this.coffeeLabService
            .getPopularList(PostType.ARTICLE, {
                count: 11,
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.relatedData = (res.result || [])
                        .filter((item) => item && item?.slug !== this.idOrSlug)
                        .slice(0, 10);
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
        this.coffeeLabService.getForumDetails(PostType.ARTICLE, this.idOrSlug).subscribe((res: any) => {
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
                    this.messageService.clear();
                    this.messageService.add({ key: 'translate', severity: 'success', closable: false });
                    this.getAllData();

                    this.setSEO();
                    if (isPlatformServer(this.platformId)) {
                        this.setSchemaMackup();
                    }
                }
            } else {
                this.toastService.error('The article is not exist.');
                this.router.navigate(['/error']);
            }
            this.loading = false;
            this.cdr.detectChanges();
        });
    }

    getAllData() {
        const promises = [];
        if (this.detailsData?.original_article_state && this.detailsData?.original_article_state === 'ACTIVE') {
            promises.push(
                new Promise((resolve) => this.getOriginalUserDetail(this.detailsData.original_article, resolve)),
            );
        }
        promises.push(new Promise((resolve) => this.getUserDetail(this.detailsData, resolve)));
        promises.push(new Promise((resolve) => this.getCommentsData(resolve)));
        Promise.all(promises)
            .then(() => this.cdr.detectChanges())
            .catch(() => this.cdr.detectChanges());
    }

    setSEO() {
        let title: string;
        let description: string;
        if (this.detailsData?.title) {
            title = this.detailsData?.title.concat(' - Era of We Coffee Forum');
        } else {
            title = 'Era of We Coffee Forum';
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

    getOriginalUserDetail(userDetails: any, resolve): void {
        this.coffeeLabService.getUserDetail(userDetails.user_id, userDetails.organisation_type).subscribe((res) => {
            if (res.success) {
                this.orginalUserData = res.result;
            }
            resolve();
        });
    }

    getUserDetail(userDetails: any, resolve): void {
        this.coffeeLabService.getUserDetail(userDetails.user_id, userDetails.organisation_type).subscribe((res) => {
            if (res.success) {
                this.stickySecData = res.result;
            }
            resolve();
        });
    }

    getCommentsData(resolve): void {
        this.coffeeLabService.getCommentList(PostType.ARTICLE, this.detailsData.slug).subscribe((res: any) => {
            if (res.success) {
                this.allComments = res.result;
                this.commentData = this.allComments?.slice(0, 3);
                if (this.allComments?.length > 3) {
                    this.showCommentBtn = true;
                } else {
                    this.showCommentBtn = false;
                }
            }
            resolve();
        });
    }

    toastCalled(event) {
        if (event) {
            this.showToaster = true;
        }
    }
}
