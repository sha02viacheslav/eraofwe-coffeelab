import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { GlobalsService, SEOService } from '@services';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    loaded = true;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        public glogbalService: GlobalsService,
        private seoService: SEOService,
    ) {}

    ngOnInit(): void {
        this.seoService.createLinkForCanonicalURL();
    }

    openSideNav() {}
    gotoLogin() {
        this.document.location.href = `${environment.ssoWeb}/login`;
    }
}
