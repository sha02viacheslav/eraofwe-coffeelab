import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalsService } from '../globals.service';
import { I18NService } from '../i18n/i18n.service';

@Injectable()
export class StartupService {
    constructor(
        private i18n: I18NService,
        private globals: GlobalsService,
        private translate: TranslateService,
        private httpClient: HttpClient,
    ) {}

    load(): Promise<any> {
        return new Promise((resolve) => {
            zip(this.httpClient.get(`https://fed-api.sewnstaging.com/translations/${this.i18n.currentLang}/exp`))
                .pipe(
                    catchError((res) => {
                        console.warn(`StartupService.load: Network request failed`, res);
                        resolve(null);
                        return [];
                    }),
                )
                .subscribe(
                    ([langData]) => {
                        console.log(langData);
                        this.translate.setTranslation(this.i18n.currentLang, langData);
                        this.globals.languageJson = langData;
                    },
                    () => {},
                    () => {
                        resolve(null);
                    },
                );
        });
    }
}
