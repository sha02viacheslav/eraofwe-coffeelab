import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { languages } from '@constants';
import { GlobalsService } from '@services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
})
export class TranslationDropdownComponent implements OnInit {
    @Input() translatedList;
    @Input() forumType;
    languages = languages;

    constructor(public globalsService: GlobalsService, private router: Router) {}

    ngOnInit(): void {}

    onChangeTranslate(event) {
        this.router.navigate([
            `/${event.value.language}/${this.forumType ?? 'article'}/${event.value.slug || event.value.question_slug}`,
        ]);
    }
}
