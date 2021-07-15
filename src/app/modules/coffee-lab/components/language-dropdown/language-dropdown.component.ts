import { Component, OnInit } from '@angular/core';
import { languages } from '@constants';
import { CoffeeLabService } from '@services';
import { APP_LANGUAGES } from '@constants';

@Component({
    selector: 'app-language-dropdown',
    templateUrl: './language-dropdown.component.html',
    styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
    languages = languages;
    languageList: any[] = APP_LANGUAGES;
    selectedLanguage: string;

    constructor(public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.selectedLanguage = this.coffeeLabService.currentForumLanguage;
    }

    onChangeLanguage(): void {
        this.coffeeLabService.forumLanguage.next(this.selectedLanguage);
    }
}
