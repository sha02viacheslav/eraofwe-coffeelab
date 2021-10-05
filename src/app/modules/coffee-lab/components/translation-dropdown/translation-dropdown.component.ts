import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
})
export class TranslationDropdownComponent implements OnInit {
    @Input() translatedList;
    @Input() forumType;
    isBrower = false;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        this.isBrower = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {}

    getLink(item) {
        return `/${getLangRoute(item.language)}/${this.forumType ?? 'articles'}/${item.slug || item.question_slug}`;
    }
}
