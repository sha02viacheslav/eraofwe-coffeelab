import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    PLATFORM_ID,
} from '@angular/core';
import { CoffeeLabService } from '@services';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationDropdownComponent implements OnInit {
    @Input() translatedList;
    @Input() forumType;
    @Output() isToastCalled = new EventEmitter();
    isBrower = false;

    constructor(@Inject(PLATFORM_ID) private platformId: object, private coffeeLabService: CoffeeLabService) {
        this.isBrower = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {}

    getLink(item) {
        return `/${getLangRoute(item.language)}/${this.forumType ?? 'articles'}/${item.slug || item.question_slug}`;
    }

    updateLang(item) {
        this.coffeeLabService.forumLanguage.next(item.language);
        this.isToastCalled.emit(true);
    }
}
