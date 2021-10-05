import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CoffeeLabService } from '@services';
import { APP_LANGUAGES, RouterMap, ROUTER_SLUG_ITEMS } from '@constants';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-language-dropdown',
    templateUrl: './language-dropdown.component.html',
    styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
    readonly RouterMap = RouterMap;
    readonly ROUTER_SLUG_ITEMS = ROUTER_SLUG_ITEMS;
    readonly getLangRoute = getLangRoute;
    languageList: any[] = APP_LANGUAGES;
    selectedLangCode: string;
    selectedFullLang: string;
    isBrower = false;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object,
        public coffeeLabService: CoffeeLabService,
    ) {
        this.isBrower = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
        this.selectedLangCode = this.coffeeLabService.currentForumLanguage;
        this.getLanguageName(this.coffeeLabService.currentForumLanguage);
    }

    onChangeLanguage(): void {
        this.getLanguageName(this.selectedLangCode);
        this.document.documentElement.lang = getLangRoute(this.selectedLangCode);
        this.coffeeLabService.forumLanguage.next(this.selectedLangCode);
    }

    getLanguageName(code: string) {
        this.languageList.filter((i) => {
            if (i.value === code) {
                this.selectedFullLang = i.label[code];
            }
        });
    }
}
