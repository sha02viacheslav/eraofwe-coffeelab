import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CoffeeLabService, SEOService, GlobalsService, ResizeService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ResizeableComponent } from '@base-components';
import { seoVariables } from '@constants';

@Component({
    selector: 'app-qa-forum-view',
    templateUrl: './qa-forum-view.component.html',
    styleUrls: ['./qa-forum-view.component.scss'],
})
export class QaForumViewComponent extends ResizeableComponent implements OnInit {
    viewModeItems: any[] = [{ value: 'list' }, { value: 'grid' }];
    viewMode = 'list';
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most Answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    filterOptions = [
        {
            label: 'Coffee experts',
            value: false,
        },
        {
            label: 'End consumers',
            value: true,
        },
    ];
    sortBy = 'latest';
    filterBy: any;
    questions: any[] = [];
    isLoading = false;
    keyword = '';

    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private seoService: SEOService,
        private globalsService: GlobalsService,
        protected resizeService: ResizeService,
        @Inject(DOCUMENT) private document: Document,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.getQuestions();
        this.setSEO();
        this.sortOptions = [
            {
                label: this.globalsService.languageJson?.latest,
                value: 'latest',
            },
            {
                label: this.globalsService.languageJson?.most_answered,
                value: 'most_answered',
            },
            {
                label: this.globalsService.languageJson?.oldest,
                value: 'oldest',
            },
        ];
        this.filterOptions = [
            {
                label: this.globalsService.languageJson?.coffee_experts,
                value: false,
            },
            {
                label: this.globalsService.languageJson?.end_consumers,
                value: true,
            },
        ];
        window.scroll(0, 0);
    }

    getQuestions(): void {
        const params = {
            query: this.keyword,
            is_consumer: this.filterBy,
            sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order: this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' ? 'desc' : 'asc',
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('question', params).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.questions = res.result?.questions;
            } else {
                this.toastService.error('Cannot get forum data');
            }
        });
    }

    setSEO() {
        const title =
            this.coffeeLabService.currentForumLanguage === 'en'
                ? 'Coffee forum & community - The Coffee Lab'
                : 'Kaffe forum & community - The Coffee Lab';
        const description =
            this.coffeeLabService.currentForumLanguage === 'en'
                ? 'Coffee questions & answers forum for end-consumers and coffee experts the coffee supply chain.'
                : 'Kaffe forum frågor och svar för konsumenter och kaffe experter från kaffeindustrin.';
        this.seoService.setPageTitle(title);
        this.seoService.setMetaData('name', 'description', description);
        this.seoService.createLinkForCanonicalURL();

        this.seoService.setMetaData('property', 'og:title', title);
        this.seoService.setMetaData('property', 'og:description', description);
        this.seoService.setMetaData('property', 'og:url', this.document.URL);
        this.seoService.setMetaData('property', 'og:image', seoVariables.image);

        this.seoService.setMetaData('name', 'twitter:image', seoVariables.image);
        this.seoService.setMetaData('name', 'twitter:creator', seoVariables.author);
        this.seoService.setMetaData('name', 'twitter:site', this.document.URL);
        this.seoService.setMetaData('name', 'twitter:title', title);
        this.seoService.setMetaData('name', 'twitter:description', description);
    }
}
