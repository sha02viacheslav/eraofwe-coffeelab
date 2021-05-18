import { registerLocaleData, DOCUMENT } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import ngSe from '@angular/common/locales/se';
import ngSv from '@angular/common/locales/sv';
import ngPt from '@angular/common/locales/pt';
import { Inject, Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { APP_LANGUAGES } from '@constants';

interface LangData {
    text: string;
    ng: any;
}

const DEFAULT = 'en';
const LANGS: { [key: string]: LangData } = {
    en: {
        text: 'English',
        ng: ngEn,
    },
    es: {
        text: 'Spanish',
        ng: ngSe,
    },
    sv: {
        text: 'Swedish',
        ng: ngSv,
    },
    pt: {
        text: 'Portuguese',
        ng: ngPt,
    },
};

@Injectable({ providedIn: 'root' })
export class I18NService {
    private default = DEFAULT;

    private langs = Object.keys(LANGS).map((code) => {
        const item = LANGS[code];
        return { code, text: item.text };
    });

    constructor(private translate: TranslateService, @Inject(DOCUMENT) private doc) {
        const lans = this.langs.map((item) => item.code);
        translate.addLangs(lans);

        const defaultLan = this.getDefaultLang();
        if (lans.includes(defaultLan)) {
            this.default = defaultLan;
        }

        this.updateLangData(this.default);
    }

    private getDefaultLang(): string | undefined {
        const code = this.doc.URL.split(environment.coffeeLabWeb)[1]?.split('/')[1];
        if (APP_LANGUAGES.includes(code)) {
            return code;
        }
        return 'en';
    }

    private updateLangData(lang: string) {
        const item = LANGS[lang];
        registerLocaleData(item.ng);
    }

    use(lang: string): void {
        lang = lang || this.translate.getDefaultLang();
        if (this.currentLang === lang) {
            return;
        }
        this.updateLangData(lang);
        this.translate.use(lang);
    }

    getLangs() {
        return this.langs;
    }

    get defaultLang() {
        return this.default;
    }

    get currentLang() {
        return this.translate.currentLang || this.translate.getDefaultLang() || this.default;
    }
}
