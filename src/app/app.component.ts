import { Component } from '@angular/core';
import { SEOService } from '@services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private seoService: SEOService) {
        this.seoService.createLinkForCanonicalURL();
    }
}
