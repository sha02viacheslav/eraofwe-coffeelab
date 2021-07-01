import { Component, OnInit } from '@angular/core';
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

    constructor(public glogbalService: GlobalsService) {}

    ngOnInit(): void {}

    openSideNav() {}

    onCheckPassword() {
        this.isMatched = this.password === protectPassword || !environment.needProtect;
    }
}
