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
    @Output() handleChangeTranslation = new EventEmitter();
    languages = languages;

    constructor(public globalsService: GlobalsService, private router: Router) {}

    ngOnInit(): void {}

    onChangeTranslate(event) {
        if (this.handleChangeTranslation.observers.length > 0) {
            this.handleChangeTranslation.emit(event.value.id);
        } else {
            this.router.navigate([`/coffee-lab/${this.forumType ?? 'article'}/${event.value.slug}`]);
        }
    }
}
