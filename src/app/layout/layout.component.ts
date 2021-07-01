import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { GlobalsService } from '@services';
import { protectPassword } from '@constants';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    loaded = true;
    password = '';
    isMatched = !environment.needProtect;
    ssoWeb = environment.ssoWeb;
    isStaging = environment.needProtect;

    constructor(@Inject(DOCUMENT) private document: Document, public glogbalService: GlobalsService) {}

    ngOnInit(): void {
        console.log(this.ssoWeb);
    }

    openSideNav() {}

    onCheckPassword() {
        this.isMatched = this.password === protectPassword || !environment.needProtect;
    }
}
