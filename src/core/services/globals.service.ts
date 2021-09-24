import { Injectable, Inject } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class GlobalsService {
    previousUrl: string;
    currentUrl: string;
    logoAlt: string;

    constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
        this.router.events
            .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.urlAfterRedirects;
                if (this.currentUrl.includes('/en/qa-forum')) {
                    this.logoAlt = 'Title - Q+A';
                } else if (this.currentUrl.includes('/en/articles')) {
                    this.logoAlt = 'Title - Post';
                } else if (this.currentUrl.includes('/en/coffee-recipes')) {
                    this.logoAlt = 'Title - Coffee Recipe';
                } else if (this.currentUrl.includes('/sv/qa-forum')) {
                    this.logoAlt = 'Title - Frågor & Svar';
                } else if (this.currentUrl.includes('/sv/articles')) {
                    this.logoAlt = 'Title - Artikel';
                } else if (this.currentUrl.includes('/sv/coffee-recipes')) {
                    this.logoAlt = 'Title - Recept';
                }
            });
    }

    getLimitCounter() {
        // const count = this.cookieService.get('limit_count') ? +this.cookieService.get('limit_count') : POST_LIMIT_COUNT;
        // return count;
        return 3;
    }

    setLimitCounter() {
        // const count = this.getLimitCounter() > 0 ? this.getLimitCounter() - 1 : 0;
        // this.cookieService.set('limit_count', count.toString());
    }

    getJustText(content: any) {
        if (content) {
            const contentElement = this.document.createElement('div');
            contentElement.innerHTML = content;
            return contentElement.textContent;
        } else {
            return '';
        }
    }
}
