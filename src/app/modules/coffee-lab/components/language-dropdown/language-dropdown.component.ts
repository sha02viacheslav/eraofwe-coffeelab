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
    selectedLanguage: string;

    constructor(public coffeeLabService: CoffeeLabService, private globals: GlobalsService) {}

    ngOnInit(): void {
        if (this.coffeeLabService.currentForumLanguage === 'en') {
            this.selectedLanguage = 'English';
        } else if (this.coffeeLabService.currentForumLanguage === 'sv') {
            this.selectedLanguage = 'Swedish';
        } else if (this.coffeeLabService.currentForumLanguage === 'Portuguese') {
            this.selectedLanguage = 'Portuguese';
        } else if (this.coffeeLabService.currentForumLanguage === 'Spanish') {
            this.selectedLanguage = 'Spanish';
        }
    }

    onChangeLanguage(): void {
        let value: string;
        if (this.selectedLanguage === 'English') {
            value = 'en';
        } else if (this.selectedLanguage === 'Swedish') {
            value = 'sv';
        } else if (this.selectedLanguage === 'Portuguese') {
            value = 'pt';
        } else if (this.selectedLanguage === 'Spanish') {
            value = 'es';
        }
        this.coffeeLabService.forumLanguage.next(value);
    }
}
