import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CoffeeLabService, SEOService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { routerMap, seoVariables } from '@constants';

import { DISCUSSIONS_FORUM } from '../data';

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
        this.data = DISCUSSIONS_FORUM;
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.setSEO();
            // this.getData();
        });
        // this.getData();
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
                    this.data = res.result ? res.result : [];
                } else {
                    this.toastService.error('Cannot get Articles data');
                }
                this.isLoading = false;
            });
    }

    setSEO() {
        const title =
            this.forumLanguage === 'en'
                ? 'Creating impactful relationships - The Coffee Lab'
                : 'Skapar effektfulla relationer - The Coffee Lab';
        const description =
            this.forumLanguage === 'en'
                ? 'The Coffee Lab is a global community committed to the future of coffee.'
                : 'The Coffee Lab är ett globalt community för att säkerställa framitden för kaffe.';
        this.seoService.setPageTitle(title);
        this.seoService.setMetaData('name', 'description', description);

        this.seoService.setMetaData('property', 'og:title', title);
        this.seoService.setMetaData('property', 'og:image', seoVariables.image);
        this.seoService.setMetaData('property', 'og:description', description);
        this.seoService.setMetaData('property', 'og:url', this.document.URL);

        this.seoService.setMetaData('name', 'twitter:creator', seoVariables.author);
        this.seoService.setMetaData('name', 'twitter:site', this.document.URL);
        this.seoService.setMetaData('name', 'twitter:title', title);
        this.seoService.setMetaData('name', 'twitter:description', description);
        this.seoService.setMetaData('name', 'twitter:image', seoVariables.image);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
