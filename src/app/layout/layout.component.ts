import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { GlobalsService, SEOService } from '@services';
import { protectPassword } from '@constants';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    loaded = true;
    password = '';
    isMatched = !environment.protectNeed;

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

    onCheckPassword() {
        this.isMatched = this.password === protectPassword || !environment.protectNeed;
    }
}
