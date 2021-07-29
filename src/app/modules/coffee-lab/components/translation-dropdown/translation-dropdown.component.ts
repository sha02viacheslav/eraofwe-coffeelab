import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
})
export class TranslationDropdownComponent implements OnInit {
    @Input() translatedList;
    @Input() forumType;

    constructor(public globalsService: GlobalsService) {}

    ngOnInit(): void {}

    getLink(item) {
        return `/${item.language}/${this.forumType ?? 'articles'}/${item.slug || item.question_slug}`;
    }
}
