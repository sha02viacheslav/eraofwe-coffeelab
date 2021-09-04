import { Component, OnInit } from '@angular/core';
import { CoffeeLabService, GlobalsService } from '@services';
import { APP_LANGUAGES, RouterMap, ROUTER_SLUG_ITEMS } from '@constants';

@Component({
    selector: 'app-language-dropdown',
    templateUrl: './language-dropdown.component.html',
    styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
    readonly RouterMap = RouterMap;
    readonly ROUTER_SLUG_ITEMS = ROUTER_SLUG_ITEMS;
    languageList: any[] = APP_LANGUAGES;
    selectedLangCode: string;
    selectedFullLang: string;

    constructor(public coffeeLabService: CoffeeLabService, private globals: GlobalsService) {}

    ngOnInit(): void {
        this.getLanguageName(this.coffeeLabService.currentForumLanguage);
    }

    onChangeLanguage(): void {
        this.getLanguageName(this.selectedLangCode);
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
