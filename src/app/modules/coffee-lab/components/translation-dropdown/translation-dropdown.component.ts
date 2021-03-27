import { Component, OnInit, Input } from '@angular/core';
import { languages } from '@constants';
import { GlobalsService } from '@services';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
})
export class TranslationDropdownComponent implements OnInit {
    @Input() translatedList;
    @Input() forumtype;
    languages = languages;

    constructor(public globalsService: GlobalsService, private router: Router) {}

    ngOnInit(): void {}

    onChangeTranslate(event) {
        console.log(event);
        const navigationExtras: NavigationExtras = {
            queryParams: {
                id: event.value,
            },
        };
        this.router.navigate([`/coffee-lab/${this.forumtype ?? 'article'}`], navigationExtras);
    }
}
