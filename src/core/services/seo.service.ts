import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { seoVariables } from '@constants';

@Injectable({
    providedIn: 'root',
})
export class SEOService {
    constructor(private title: Title, @Inject(DOCUMENT) private doc, private meta: Meta) {}
    setPageTitle(title = '') {
        // Have to add ... to prevent duplicated title and h1 issue
        this.title.setTitle(title.length > 60 ? title.substr(0, 60) + '...' : title);
    }
    getPageTitle() {
        return this.title.getTitle();
    }
    setMetaData(type, name, content) {
        const metaData: any = {
            [type]: name,
            content,
        };
        this.meta.updateTag(metaData);
    }

    setSEO(title: string, description: string) {
        this.setPageTitle(title);
        this.setMetaData('name', 'description', description.substr(0, 160));

        this.setMetaData('property', 'og:title', title);
        this.setMetaData('property', 'og:description', description.substr(0, 160));
        this.setMetaData('property', 'og:url', this.doc.URL);
        this.setMetaData('property', 'og:image', `${seoVariables.image}?v=${Date.now()}`);

        this.setMetaData('name', 'twitter:image', seoVariables.image);
        this.setMetaData('name', 'twitter:creator', seoVariables.author);
        this.setMetaData('name', 'twitter:site', this.doc.URL);
        this.setMetaData('name', 'twitter:title', title);
        this.setMetaData('name', 'twitter:description', description.substr(0, 160));

        this.createLinkForCanonicalURL();
    }

    createLinkForCanonicalURL() {
        // console.log(this.doc.URL);
        if (this.doc.URL?.includes('https')) {
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
    }
    createLinkForHreflang(lang: string) {
        const url = this.doc.URL.split(environment.coffeeLabWeb)[1];
        if (url) {
            const link: HTMLLinkElement = this.doc.createElement('link');
            link.setAttribute('rel', 'alternate');
            const url2 = url.substr(3);
            // console.log(url2, lang);
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
