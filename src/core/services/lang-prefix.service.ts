import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { extractLangPrefix } from '@utils';

@Injectable({
    providedIn: 'root',
})
export class LangPrefixService {
    constructor(private injector: Injector, @Inject(PLATFORM_ID) private platformId: object) {}

    langPrefix() {
        const defaultLang = 'en';
        if (isPlatformServer(this.platformId)) {
            const langPrefix = this.injector.get('langPrefix', defaultLang);
            return langPrefix || defaultLang;
        } else {
            return extractLangPrefix(window.location.href) || defaultLang;
        }
    }
}
