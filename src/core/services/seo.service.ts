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
        this.title.setTitle(title);
    }
    getPageTitle() {
        return this.title.getTitle();
    }
    setMetaData(name, content) {
        const metaData: any = {
            name,
            content,
        };
        this.meta.updateTag(metaData);
    }

    createLinkForCanonicalURL() {
        const link: HTMLLinkElement = this.doc.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.doc.head.appendChild(link);
        link.setAttribute('href', this.doc.URL);
    }
    createLinkForHreflang(lang: string) {
        const url = this.doc.URL.split(environment.coffeeLabWeb)[1];
        const link: HTMLLinkElement = this.doc.createElement('link');
        link.setAttribute('rel', 'alternate');
        const newUrl =
            lang === 'x-default' ? `${environment.coffeeLabWeb}${url}` : `${environment.coffeeLabWeb}/${lang}${url}`;
        this.doc.head.appendChild(link);
        link.setAttribute('href', newUrl);
        link.setAttribute('hreflang', lang);
    }
    getJsonLD(userName, count?) {
        const jsonLD: any = {
            '@context': 'https://schema.org',
            '@type': 'DiscussionForumPosting',
            '@id': this.doc.URL,
            headline: this.getPageTitle(),
            author: {
                '@type': 'Person',
                name: userName,
            },
        };
        if (count) {
            jsonLD.interactionStatistic = {
                '@type': 'InteractionCounter',
                interactionType: 'https://schema.org/CommentAction',
                userInteractionCount: count,
            };
        }
        return jsonLD;
    }
    createUrlForLang() {}
}
