import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CoffeeLabService, SEOService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { getJustText } from '@utils';
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
            this.getDetails();
        });
    }

    ngOnInit(): void {}

    getQaList() {
        this.coffeeLabService.getForumList('question').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result.questions
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 5);
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
                    this.setSEO();
                }
            } else {
                this.toastService.error('The question is not exist.');
                this.router.navigate(['/error']);
            }
            this.loading = false;
        });
    }

    setSEO() {
        this.seoService.setPageTitle(this.detailsData?.question);
        if (this.detailsData?.answers?.length) {
            const firstAnswer = this.detailsData?.answers[0];
            this.seoService.setMetaData('description', getJustText(firstAnswer.answer));
        }
        this.seoService.createLinkForCanonicalURL();
        this.seoService.createLinkForHreflang(this.lang || 'x-default');
        this.jsonLD = this.seoService.getJsonLD(this.detailsData.user_name, this.detailsData.answers.length);
    }

    getAnswer(id) {
        this.coffeeLabService.getForumDetails('answer', id).subscribe((res: any) => {
            if (res.success) {
                const temp = this.detailsData.answers.map((item) => {
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
