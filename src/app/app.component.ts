import { Component } from '@angular/core';
import { SEOService } from '@services';
import { environment } from '@env/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isStaging = environment.needProtect;
    constructor(private seoService: SEOService) {
        this.seoService.createLinkForCanonicalURL();
        if (this.isStaging) {
            this.seoService.setMetaData('name', 'robots', 'noindex, nofollow');
        }
    }
}
