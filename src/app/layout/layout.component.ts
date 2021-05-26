import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    loaded = true;

    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngOnInit(): void {}

    openSideNav() {}
    gotoLogin() {
        this.document.location.href = `${environment.ssoWeb}/login`;
    }
}
