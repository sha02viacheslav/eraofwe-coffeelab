import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CoffeeLabService, SEOService, I18NService } from '@services';
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
    loading = true;
    jsonLD: any;
    lang: any;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastrService,
        private seoService: SEOService,
        private location: Location,
        private i18nService: I18NService,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            if (params.idOrSlug) {
                this.idOrSlug = params.idOrSlug;
                this.lang = params.lang;
                this.getDetails();
            }
            if (!this.relatedData?.length) {
                this.getQaList();
            }
        });
    }

    ngOnInit(): void {}

    getQaList() {
        this.coffeeLabService.getForumList('question').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result.questions
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 3);
                if (!this.idOrSlug) {
                    this.router.navigate([`/qa/${this.relatedData[0].slug}`]);
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
                    this.i18nService.use(this.lang || 'en');
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

    onShare(postItem) {}
    onSavePost(postItem) {}
    onTranslate(postItem) {}
}
