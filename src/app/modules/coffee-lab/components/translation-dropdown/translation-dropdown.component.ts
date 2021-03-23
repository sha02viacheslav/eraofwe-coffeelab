import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
})
export class TranslationDropdownComponent implements OnInit {
    translateList: any[] = [
        {
            slug: 'coffee-spanish',
            avatarUrl: 'assets/images/user-sample.png',
            name: 'Gabriel Match',
            language: 'Spanish Translation',
            date: '5 days ago',
        },
        {
            slug: 'coffee-swedish',
            avatarUrl: 'assets/images/user-sample.png',
            name: 'Anthony Jones',
            language: 'Swedish Translation',
            date: '4 days ago',
        },
    ];

    constructor() {}

    ngOnInit(): void {}

    onChangeTranslate(event) {
        console.log(event);
    }
}
