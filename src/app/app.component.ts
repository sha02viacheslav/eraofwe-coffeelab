import { Component, Inject } from '@angular/core';
import { I18NService, SEOService } from '@services';
import { environment } from '@env/environment';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isStaging = environment.needProtect;
    constructor(
        private seoService: SEOService,
        private i8nService: I18NService,
        @Inject(DOCUMENT) private document: Document,
    ) {
        this.seoService.createLinkForCanonicalURL();
        console.log(this.i8nService.currentLang);
        this.document.documentElement.lang = this.i8nService.currentLang;
        if (this.isStaging) {
            this.seoService.setMetaData('name', 'robots', 'noindex, nofollow');
        }
    }
}
