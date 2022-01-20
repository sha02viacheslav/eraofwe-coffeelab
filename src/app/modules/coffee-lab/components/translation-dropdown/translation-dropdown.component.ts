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
    @Input() translatedList: any;
    @Input() forumType: any;
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
        this.coffeeLabService.getIpInfo().subscribe((resp: any) => {
            const isLang = APP_LANGUAGES.find((lang) => lang.countries.includes(resp.countryCode));
            if (isLang && this.coffeeLabService.currentForumLanguage !== isLang.value) {
                const isTransLang = this.translatedList.find(
                    (item) => item.language.toUpperCase() === isLang.value.toUpperCase(),
                );
                if (isPlatformBrowser(this.platformId) && isTransLang && getCookie('langChange') !== 'set') {
                    this.dialogSrv.open(RedirectPopupComponent, {
                        data: {
                            isDetailPage: true,
                            langName: isLang.label.en,
                            langCode: isLang.value,
                            countryName: resp.countryName,
                            slug: isTransLang.slug,
                        },
                    });
                }
            }
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
