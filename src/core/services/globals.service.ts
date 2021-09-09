import { Injectable, Inject } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { COUNTRY_LIST, CONTINIENT_LIST, languages, POST_LIMIT_COUNT } from '@constants';
import { Country } from '@models';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class GlobalsService {
    languageJson: any;
    previousUrl: string;
    currentUrl: string;
    logoAlt: string;

    constructor(
        private cookieService: CookieService,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
    ) {
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

    countTheString(value: any, count: any) {
        let stringData = value;
        stringData = stringData.replace(/(^\s*)|(\s*$)/gi, '');
        stringData = stringData.replace(/[ ]{2,}/gi, ' ');
        stringData = stringData.replace(/\n /, '\n');
        if (stringData === '') {
            return 0;
        } else {
            const outputLength = stringData.split(' ').length;
            if (outputLength > count) {
                value = stringData
                    .split(' ')
                    .splice(outputLength - 1, 1)
                    .join(' ');
                return outputLength - 1;
            }
            return outputLength;
        }
    }

    getTheMaxLength(value: any, countValue: any) {
        const getLength = this.countTheString(value, countValue);
        return getLength === countValue ? value.length : '';
    }

    getCountry(data: string): Country {
        if (data) {
            return COUNTRY_LIST.find((con: any) => con.isoCode === data.toUpperCase());
        }
        return null;
    }

    getCountryName(isoCode: string): string {
        if (isoCode) {
            const country = COUNTRY_LIST.find((c) => c.isoCode === isoCode.toUpperCase());
            if (country) {
                return country.name;
            }
        }
        return '';
    }

    getContinentName(code: string): string {
        if (code) {
            if (CONTINIENT_LIST[code]) {
                return CONTINIENT_LIST[code];
            }
        }
        return '';
    }

    getLanguage(code: string): string {
        if (code) {
            const language = languages.find((c) => c.value === code.toLowerCase());
            if (language) {
                return language.name;
            }
        }
        return '';
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
