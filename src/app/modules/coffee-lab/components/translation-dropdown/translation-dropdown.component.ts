import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    PLATFORM_ID,
} from '@angular/core';
import { APP_LANGUAGES } from '@constants';
import { CoffeeLabService } from '@services';
import { getCookie, getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { RedirectPopupComponent } from '../redirect-popup/redirect-popup.component';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationDropdownComponent implements OnInit, AfterViewInit {
    @Input() translatedList;
    @Input() forumType;
    @Output() isToastCalled = new EventEmitter();
    isBrower = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
    ) {
        this.isBrower = isPlatformBrowser(this.platformId);
    }
    ngAfterViewInit(): void {
        this.coffeeLabService.getCountries().subscribe((resp: any) => {
            this.translatedList.forEach((item) => {
                if (item.language === resp.countryCode) {
                    if (
                        this.coffeeLabService.currentForumLanguage !== item.value &&
                        getCookie('langChange') !== 'set'
                    ) {
                        this.dialogSrv.open(RedirectPopupComponent, {
                            data: {
                                langName: item.label.en,
                                langCode: item.value,
                                countryName: resp.countryName,
                            },
                        });
                    }
                }
            });
        });
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
