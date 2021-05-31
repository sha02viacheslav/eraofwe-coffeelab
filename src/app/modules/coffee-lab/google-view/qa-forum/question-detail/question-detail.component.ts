import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CoffeeLabService, SEOService, I18NService, GlobalsService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { getJustText } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../../components/signup-modal/signup-modal.component';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    loading = true;
    jsonLD: any;
    lang: any;
    previousUrl: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastrService,
        private seoService: SEOService,
        private location: Location,
        private i18nService: I18NService,
        private globalsService: GlobalsService,
        public dialogSrv: DialogService,
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

    ngOnInit(): void {
        this.previousUrl = this.globalsService.previousUrl;
    }

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
                    this.location.back();
                } else {
                    this.globalsService.setLimitCounter();
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

    onGoRelatedQuestion(item) {
        if (this.globalsService.getLimitCounter() > 0) {
            this.router.navigate([`/qa/${item.slug}`]);
        } else {
            this.dialogSrv.open(SignupModalComponent, {
                data: {
                    isLimit: true,
                    count: this.globalsService.getLimitCounter(),
                },
                showHeader: false,
                styleClass: 'signup-dialog',
            });
        }
    }
}
