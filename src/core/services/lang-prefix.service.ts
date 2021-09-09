import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LangPrefixService {
    constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: object) {}

    langPrefix() {
        const defaultLang = 'en';
        if (isPlatformServer(this.platformId)) {
            const lang = this.injector.get('lang', defaultLang);
            return `${lang}`;
        } else {
            const supportedLangs = ['/en/', '/sv/', '/pt-br/', '/es/'];
            let language = defaultLang;
            supportedLangs.forEach((item) => {
                if (window.location.href.includes(item)) {
                    language = item.replace('/', '').replace('/', '');
                }
            });
            return language;
        }
    }
}
