import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class SEOService {
    constructor(private title: Title, @Inject(DOCUMENT) private doc, private meta: Meta) {}
    setPageTitle(title: string) {
        this.title.setTitle(title?.substr(0, 60));
    }
    getPageTitle() {
        return this.title.getTitle();
    }
    setMetaData(type, name, content) {
        const metaData: any = {
            [type]: name,
            content: name === 'description' ? content?.substr(0, 160) : content,
        };
        this.meta.updateTag(metaData);
    }

    createLinkForCanonicalURL() {
        console.log(this.doc.URL);
        const existingLink = this.doc.querySelector('link[rel="canonical"]');
        if (existingLink) {
            existingLink.setAttribute('href', this.doc.URL);
        } else {
            const newLink: HTMLLinkElement = this.doc.createElement('link');
            newLink.setAttribute('rel', 'canonical');
            this.doc.head.appendChild(newLink);
            newLink.setAttribute('href', this.doc.URL);
        }
    }
    createLinkForHreflang(lang: string) {
        const url = this.doc.URL.split(environment.coffeeLabWeb)[1];
        if (url) {
            const link: HTMLLinkElement = this.doc.createElement('link');
            link.setAttribute('rel', 'alternate');
            const url2 = url.substr(3);
            console.log(url2, lang);
            const newUrl =
                lang === 'x-default'
                    ? `${environment.coffeeLabWeb}${url}`
                    : `${environment.coffeeLabWeb}/${lang}${url2}`;
            this.doc.head.appendChild(link);
            link.setAttribute('href', newUrl);
            link.setAttribute('hreflang', lang);
        }
    }
    createUrlForLang() {}
}
