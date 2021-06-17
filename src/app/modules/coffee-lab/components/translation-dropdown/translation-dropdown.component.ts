import { Component, OnInit, Input } from '@angular/core';
import { languages } from '@constants';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
})
export class TranslationDropdownComponent implements OnInit {
    @Input() translatedList;
    @Input() forumType;
    languages = languages;

    constructor(public globalsService: GlobalsService) {}

    ngOnInit(): void {}

    getLink(item) {
        return `/${item.language}/${this.forumType ?? 'article'}/${item.slug || item.question_slug}`;
    }
}
