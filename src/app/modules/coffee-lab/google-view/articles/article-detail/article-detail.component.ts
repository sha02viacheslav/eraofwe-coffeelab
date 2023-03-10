import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { MetaDespMinLength, RouterMap } from '@constants';
import { OrganizationType, PostType, RouterSlug } from '@enums';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, ResizeService, SEOService, StartupService } from '@services';
import { ConvertToShortDescriptionPipe } from '@shared';
import { getLangRoute, removeImages } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss'],
    providers: [ConvertToShortDescriptionPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailComponent extends ResizeableComponent implements OnInit {
    readonly PostType = PostType;
    items = [];
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    initialized = false;
    loading = false;
    jsonLD: any;
    lang: any;
    addComment = false;
    orginalUserData: any;
    commentData: any;
    allComments: any;
    showCommentBtn = false;
    orignalArticleName: string;
    urlLang: string;
    showAll = true;
    showToaster = false;
    showComment = false;
    showCommentOff = true;
    stickySecData: any;

    constructor(
        @Inject(DOCUMENT) private doc,
        @Inject(PLATFORM_ID) private platformId: object,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private router: Router,
        private seoService: SEOService,
        private startupService: StartupService,
        protected resizeService: ResizeService,
        private translator: TranslateService,
        private convertToShortDescription: ConvertToShortDescriptionPipe,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.activatedRoute.parent.parent.params.subscribe((res) => {
            this.urlLang = res.lang;
        });
        this.activatedRoute.params.subscribe((params) => {
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.getDetails();
            }
            this.getArticleList();
            if (isPlatformBrowser(this.platformId)) {
                if (this.isMobile$) {
                    this.showAll = false;
                    this.catchScrollEvent();
                }
                window.scrollTo(0, 0);
            }
        });
        this.initialized = true;
    }

    catchScrollEvent() {
        if (isPlatformBrowser(this.platformId) && this.isMobile$) {
            const scrollEvent = fromEvent(window, 'scroll')
                .pipe(debounceTime(100))
                .pipe(takeUntil(this.unsubscribeAll$))
                .subscribe((res) => {
                    if (window.scrollY > 10) {
                        scrollEvent.unsubscribe();
                        this.showAll = true;
                        this.detectChanges();
                    }
                });
        }
    }

    getArticleList(): any {
        this.relatedData = [];
        this.coffeeLabService
            .getPopularList(
                PostType.ARTICLE,
                {
                    count: 7,
                },
                this.urlLang === 'pt-br' ? 'pt' : this.urlLang,
            )
            .subscribe((res: any) => {
                if (res.success) {
                    this.relatedData = (res.result || [])
                        .filter((item) => item && item?.slug !== this.idOrSlug)
                        .slice(0, 6);
                }
            });
    }

    getUserData() {
        this.detailsData.organisation_type = this.detailsData.organisation_type.toLowerCase() as OrganizationType;
        this.coffeeLabService
            .getUserDetail(this.detailsData.user_id, this.detailsData.organisation_type)
            .subscribe((res) => {
                if (res.success) {
                    this.stickySecData = res.result;
                }
            });
    }

    onRealtedRoute(langCode: string, slug: string) {
        return `/${getLangRoute(langCode)}/articles/${slug}`;
    }

    public getReadableName(name) {}

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
                    this.detailsData = res.result;
                    const curRouterMap = RouterMap[getLangRoute(this.urlLang)] || RouterMap.en;
                    this.items = [
                        { label: this.translator.instant('the_coffee_lab'), routerLink: '/' },
                        {
                            label: this.translator.instant('articles'),
                            routerLink: `/${this.urlLang}/${curRouterMap[RouterSlug.ARTICLE]}`,
                        },
                        {
                            label: this.convertToShortDescription.transform(this.detailsData.title, 4),
                        },
                    ];
                    if (isPlatformServer(this.platformId)) {
                        this.detailsData.content = removeImages(res.result?.content);
                    }
                    this.lang = res.result.language;
                    this.startupService.load(this.lang || 'en');
                    this.getAllData();
                    this.getUserData();
                    this.setSEO();
                    if (isPlatformServer(this.platformId)) {
                        this.setSchemaMackup();
                    }
                }
            } else {
                this.router.navigate(['/error/post-not-found'], { queryParams: { isRecipe: false } });
                this.coffeeLabService.postNotFoundCategories.next(res.result.categories);
            }
            this.loading = false;
            this.detectChanges();
        });
    }

    getAllData() {
        const promises = [];
        if (this.detailsData?.original_article_state && this.detailsData?.original_article_state === 'ACTIVE') {
            promises.push(
                new Promise((resolve) => this.getOriginalUserDetail(this.detailsData.original_article, resolve)),
            );
        }
        promises.push(new Promise((resolve) => this.getCommentsData(resolve)));
        Promise.all(promises).finally(() => this.detectChanges());
    }

    setSEO() {
        let title: string;
        let description: string;
        if (this.detailsData?.title) {
            title = this.detailsData?.title.concat(' - Era of We Coffee Forum');
        } else {
            title = 'Era of We Coffee Forum';
        }
        if (this.detailsData?.stripped_content) {
            if (this.detailsData?.stripped_content.length < MetaDespMinLength) {
                description = this.detailsData?.stripped_content.concat(
                    ' - Era of We A global coffee marketplace and community that brings together all members of the supply chain',
                );
            } else {
                description = this.detailsData?.stripped_content;
            }
        } else {
            description =
                'Era of We A global coffee marketplace and community that brings together all members of the supply chain';
        }

        this.seoService.setSEO(title, description);
    }

    setSchemaMackup() {
        const curRouterMap = RouterMap[getLangRoute(this.urlLang)] || RouterMap.en;
        this.jsonLD = {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            name: this.translator.instant('the_coffee_lab'),
                            item: `${environment.coffeeLabWeb}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: this.translator.instant('posts'),
                            item: `${environment.coffeeLabWeb}${getLangRoute(this.lang)}/${
                                curRouterMap[RouterSlug.ARTICLE]
                            }`,
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
                    description: this.detailsData?.stripped_content?.substr(0, 160),
                    image: { '@type': 'ImageObject', url: this.detailsData?.cover_image_url, height: 276, width: 824 },
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

    detectChanges() {
        if (this.initialized) {
            this.cdr.detectChanges();
        }
    }
}
