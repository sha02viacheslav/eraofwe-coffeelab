import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoffeeLabService, SEOService, GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-qa-forum-view',
    templateUrl: './qa-forum-view.component.html',
    styleUrls: ['./qa-forum-view.component.scss'],
})
export class QaForumViewComponent implements OnInit, OnDestroy {
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
    destroy$: Subject<boolean> = new Subject<boolean>();
    forumLanguage: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private seoService: SEOService,
        private globalsService: GlobalsService,
    ) {}

    ngOnInit(): void {
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
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getQuestions();
        });
    }

    getQuestions(): void {
        const params = {
            query: this.keyword,
            is_consumer: this.filterBy,
            sort_by: this.sortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order: this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' ? 'desc' : 'asc',
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('question', params, this.forumLanguage).subscribe((res: any) => {
            this.isLoading = false;
            console.log('questions >>>', res);
            if (res.success) {
                this.questions = res.result?.questions;
                this.setSEO();
            } else {
                this.toastService.error('Cannot get forum data');
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    setSEO() {
        this.seoService.setPageTitle('Era of We - The Coffee Lab Q+A Forums');
        this.seoService.setMetaData('description', 'Q+A Forums for Coffee Lab');
        this.seoService.createLinkForCanonicalURL();
        this.seoService.createLinkForHreflang(this.forumLanguage || 'x-default');
    }
}
