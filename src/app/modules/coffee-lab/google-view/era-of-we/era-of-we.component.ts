import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CoffeeLabService, SEOService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-era-of-we',
    templateUrl: './era-of-we.component.html',
    styleUrls: ['./era-of-we.component.scss'],
})
export class EraOfWeComponent implements OnInit, OnDestroy {
    data: any[] = [];
    isLoading = false;
    forumLanguage: string;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        @Inject(DOCUMENT) private document: Document,
        private seoService: SEOService,
    ) {}

    ngOnInit(): void {
        this.setSEO();
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.seoService.createLinkForHreflang(this.forumLanguage || 'x-default');
            this.getData();
        });
        this.getData();
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            is_era_of_we: true,
        };

        this.coffeeLabService
            .getForumList('article', params, this.coffeeLabService.currentForumLanguage)
            .subscribe((res) => {
                if (res.success) {
                    this.data = res.result ? res.result.slice(0, 2) : [];
                } else {
                    this.toastService.error('Cannot get Articles data');
                }
                this.isLoading = false;
            });
    }

    setSEO() {
        this.seoService.setPageTitle('About Era of We');
        this.seoService.setMetaData('description', 'Posts for Era of We');
        this.seoService.createLinkForCanonicalURL();
        this.seoService.createLinkForHreflang(this.forumLanguage || 'x-default');
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
