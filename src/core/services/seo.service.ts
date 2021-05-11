import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { APP_LANGUAGES } from '@constants';

@Injectable({
    providedIn: 'root',
})
export class SEOService {
    constructor(private title: Title, @Inject(DOCUMENT) private doc) {}
    setPageTitle(title: string) {
        this.title.setTitle(title);
    }
    getPageTitle() {
        return this.title.getTitle();
    }
    createLinkForCanonicalURL() {
        const link: HTMLLinkElement = this.doc.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.doc.head.appendChild(link);
        link.setAttribute('href', this.doc.URL);
    }
    createLinkForHreflang() {
        const url = this.doc.URL.split(environment.coffeeLabWeb)[1];
        for (const lang of [...APP_LANGUAGES, 'x-default']) {
            const link: HTMLLinkElement = this.doc.createElement('link');
            link.setAttribute('rel', 'alternate');
            const newUrl =
                lang === 'x-default'
                    ? `${environment.coffeeLabWeb}${url}`
                    : `${environment.coffeeLabWeb}${lang}/${url}`;
            this.doc.head.appendChild(link);
            link.setAttribute('href', newUrl);
            link.setAttribute('hreflang', lang);
        }
    }
    createUrlForLang() {}
}
