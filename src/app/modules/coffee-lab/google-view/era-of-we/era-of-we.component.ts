import { Component, OnInit, Inject } from '@angular/core';
import { CoffeeLabService, SEOService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { seoVariables } from '@constants';

import { DISCUSSIONS_FORUM } from '../data';

@Component({
    selector: 'app-era-of-we',
    templateUrl: './era-of-we.component.html',
    styleUrls: ['./era-of-we.component.scss'],
})
export class EraOfWeComponent implements OnInit {
    data: any[] = [];
    isLoading = false;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        @Inject(DOCUMENT) private document: Document,
        private seoService: SEOService,
    ) {}

    ngOnInit(): void {
        this.data = DISCUSSIONS_FORUM;
        this.setSEO();
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
            this.coffeeLabService.currentForumLanguage === 'en'
                ? 'Creating impactful relationships - The Coffee Lab'
                : 'Skapar effektfulla relationer - The Coffee Lab';
        const description =
            this.coffeeLabService.currentForumLanguage === 'en'
                ? 'The Coffee Lab is a global community committed to the future of coffee.'
                : 'The Coffee Lab är ett globalt community för att säkerställa framitden för kaffe.';
        this.seoService.setPageTitle(title);
        this.seoService.setMetaData('name', 'description', description);

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
