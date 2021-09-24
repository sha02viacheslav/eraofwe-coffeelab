import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalsService } from '../globals.service';
import { I18NService } from '../i18n/i18n.service';
import { CoffeeLabService } from '../api/coffee-lab.service';
import { environment } from '@env/environment';

@Injectable()
export class StartupService {
    constructor(
        private i18n: I18NService,
        private globals: GlobalsService,
        private translate: TranslateService,
        private coffeeLabService: CoffeeLabService,
        private httpClient: HttpClient,
    ) {}

    load(language?): Promise<any> {
        const oldLanguage = this.i18n.currentLang;
        if (language) {
            this.i18n.use(language);
        } else {
            this.coffeeLabService.forumLanguage.next(this.i18n.currentLang);
        }
        if (!language || oldLanguage !== this.i18n.currentLang) {
            return new Promise((resolve) => {
                zip(this.httpClient.get(`${environment.apiURL}/translations/${this.i18n.currentLang}/tcl?default=1`))
                    .pipe(
                        catchError((res) => {
                            console.warn(`StartupService.load: Network request failed`, res);
                            resolve(null);
                            return [];
                        }),
                    )
                    .subscribe(
                        ([langData]) => {
                            this.translate.setTranslation(this.i18n.currentLang, langData);
                            this.coffeeLabService.gotTranslations.next({});
                        },
                        () => {},
                        () => {
                            resolve(null);
                        },
                    );
            });
        }
    }
}
