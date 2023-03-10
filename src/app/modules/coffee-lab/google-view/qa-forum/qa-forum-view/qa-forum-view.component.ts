import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { APP_LANGUAGES } from '@constants';
import { Fields, PostType } from '@enums';
import { environment } from '@env/environment';
import { RedirectPopupComponent } from '@modules/coffee-lab/components/redirect-popup/redirect-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService, ResizeService, SEOService } from '@services';
import { getCookie, getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-qa-forum-view',
    templateUrl: './qa-forum-view.component.html',
    styleUrls: ['./qa-forum-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QaForumViewComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    readonly PostType = PostType;
    sortBy: string;
    filterBy: boolean = null;
    questions: any[] = [];
    isLoading = true;
    showAll = true;
    keyword = '';
    totalRecords = 0;
    rows = 10;
    page = 1;
    jsonLD: any;
    categoryList: any;
    selectedCategory = null;
    sortOptions = [
        { label: 'latest', value: 'latest' },
        { label: 'most_answered', value: 'most_answered' },
        { label: 'oldest', value: 'oldest' },
    ];
    filterOptions = [
        { label: 'coffee_experts', value: false },
        { label: 'coffee_consumer', value: true },
    ];
    hideContent: boolean;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private route: ActivatedRoute,
        private seoService: SEOService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        private dialogSrv: DialogService,
    ) {
        super(resizeService);

        if (isPlatformBrowser(this.platformId)) {
            if (this.isMobile$) {
                this.showAll = false;
            }
            window.scrollTo(0, 0);
        }
    }

    ngOnInit(): void {
        this.setSEO();
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                this.page = +params.get('page');
                if (this.page < 1) {
                    this.page = 1;
                }
            }
            this.hideContent = params.has('search') ? true : false;
            this.refreshData();
        });
        let langPrefix = '';
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            if (language) {
                if (langPrefix) {
                    this.refreshData();
                }
                langPrefix = language;
            }
        });
    }

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
        if (isPlatformBrowser(this.platformId)) {
            this.coffeeLabService.getIpInfo().subscribe((resp: any) => {
                if (resp) {
                    APP_LANGUAGES.forEach((item) => {
                        if (item.countries.includes(resp.countryCode)) {
                            if (
                                this.coffeeLabService.currentForumLanguage !== item.value &&
                                getCookie('langChange') !== 'set'
                            ) {
                                this.dialogSrv.open(RedirectPopupComponent, {
                                    data: {
                                        langName: item.label.en,
                                        langCode: item.value,
                                        countryName: resp.countryName,
                                    },
                                });
                            }
                        }
                    });
                }
            });
        }
    }

    refreshData() {
        this.coffeeLabService.searchResult.subscribe((res: any) => {
            if (res?.questions && this.hideContent) {
                this.questions = res.questions;
                this.isLoading = false;
            } else {
                this.getData();
            }
        });
        this.getCategory();
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

    getData(): void {
        const params = {
            query: this.keyword,
            is_consumer: this.filterBy,
            sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' || !this.sortBy ? 'desc' : 'asc',
            category_id: this.selectedCategory,
            page: this.page,
            per_page: this.rows,
            fields: Fields.INTERMEDIATE,
        };
        this.isLoading = true;
        this.cdr.detectChanges();
        this.coffeeLabService.getForumList(PostType.QA, params).subscribe((res: any) => {
            if (res.success) {
                this.questions = res.result?.questions || [];
                this.totalRecords = res.result_info.total_count;
                if (isPlatformServer(this.platformId)) {
                    this.setSchemaMackup();
                }
            }
            this.isLoading = false;
            this.cdr.detectChanges();
        });
    }

    getCategory() {
        const params = { language: this.coffeeLabService.currentForumLanguage };
        this.coffeeLabService.getCategory(params).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
            this.cdr.detectChanges();
        });
    }

    setSEO() {
        this.translator
            .getStreamOnTranslationChange(['tcl_seo_meta_title_qa', 'tcl_seo_meta_description_qa'])
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((res) => {
                this.seoService.setSEO(res.tcl_seo_meta_title_qa, res.tcl_seo_meta_description_qa);
            });
    }

    setSchemaMackup() {
        const forumList: any[] = [];
        for (const forum of this.questions) {
            const itemData = {
                '@type': 'QAPage',
                mainEntity: {
                    '@type': 'Question',
                    name: forum.slug,
                    text: forum.question,
                    answerCount: forum.answers?.length || 0,
                    dateCreated: forum.created_at,
                    author: {
                        '@type': 'Person',
                        name: forum.question_user,
                    },
                    suggestedAnswer: forum.answers?.map((answer, index) => {
                        return {
                            '@type': 'Answer',
                            text: answer.answer,
                            dateCreated: answer.created_at,

                            url: `${environment.coffeeLabWeb}${getLangRoute(
                                this.coffeeLabService.currentForumLanguage,
                            )}/qa-forum/${forum.slug}?#answer-${answer.id}`,
                            author: {
                                '@type': 'Person',
                                name: answer.user_name,
                            },
                        };
                    }),
                },
            };
            forumList.push(itemData);
        }
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
                            item: `${environment.coffeeLabWeb}${getLangRoute(
                                this.coffeeLabService.currentForumLanguage,
                            )}`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Q+A Forums',
                        },
                    ],
                },
                ...forumList,
            ],
        };
    }
}
