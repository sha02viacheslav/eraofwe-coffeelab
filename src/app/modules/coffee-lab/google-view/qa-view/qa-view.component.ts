import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CoffeeLabService, SEOService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-qa-view',
    templateUrl: './qa-view.component.html',
    styleUrls: ['./qa-view.component.scss'],
})
export class QaViewComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    loading = false;
    jsonLD: any;
    userDetails: any;
    lang: any;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastrService,
        private seoService: SEOService,
        private location: Location,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.idOrSlug = params.idOrSlug;
            this.lang = params.lang;
            this.getQaList();
            if (this.idOrSlug) {
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {}

    getQaList() {
        this.coffeeLabService.getForumList('question').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result.questions
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 5);
                if (!this.idOrSlug) {
                    this.router.navigate([`/qa/${res.result.questions[0].slug}`]);
                }
            }
        });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('question', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
                if (this.lang && this.lang !== res.result.lang_code) {
                    this.toastService.error('Language is not matched.');
                    this.location.back();
                } else {
                    this.getUserDetails();
                    this.jsonLD = {
                        '@context': 'https://schema.org',
                        '@type': 'DiscussionForumPosting',
                        '@id': `${environment.coffeeLabWeb}qa/${this.detailsData.slug}`,
                        headline: res.result.question,
                        author: {
                            '@type': 'Person',
                            name: this.detailsData.user_name,
                        },
                        interactionStatistic: {
                            '@type': 'InteractionCounter',
                            interactionType: 'https://schema.org/CommentAction',
                            userInteractionCount: this.detailsData.answers.length,
                        },
                    };
                    this.setSEO();
                }
            }
            this.loading = false;
        });
    }

    setSEO() {
        this.seoService.setPageTitle(this.detailsData?.question);
        this.seoService.createLinkForCanonicalURL();
        this.seoService.createLinkForHreflang();
    }

    getAnswer(id) {
        this.coffeeLabService.getForumDetails('answer', id).subscribe((res: any) => {
            if (res.success) {
                const temp = this.detailsData.answers.map((item) => {
                    console.log(item.id, res.result.original_details.id);
                    if (item.id === res.result.original_details.id) {
                        item = res.result;
                    }
                    return item;
                });
                this.detailsData.answers = temp;
            }
        });
    }

    getMenuItemsForItem(item) {
        const items = [
            {
                label: 'Share',
                command: () => {
                    this.onShare(item);
                },
            },
            {
                label: 'Save Post',
                command: () => {
                    this.onSavePost(item);
                },
            },
            {
                label: 'Translate answer',
                command: () => {
                    this.onTranslate(item);
                },
            },
        ];
        return [{ items }];
    }

    onGoRelatedQuestion(item) {
        this.router.navigate([`/qa/${item.slug}`]);
    }

    getUserDetails() {
        this.coffeeLabService
            .getUserDetail(this.detailsData.user_id, this.detailsData.org_type)
            .subscribe((res: any) => {
                if (res.success) {
                    this.userDetails = res.result;
                } else {
                    this.toastService.error('Cannot get user details.');
                }
            });
    }

    onShare(postItem) {}
    onSavePost(postItem) {}
    onTranslate(postItem) {}
}
