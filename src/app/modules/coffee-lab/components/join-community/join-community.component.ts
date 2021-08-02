import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';
import { RouterMap } from '@constants';
import { RouterSlug } from '@enums';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
    readonly RouterMap = RouterMap;
    readonly RouterSlug = RouterSlug;
    ssoWeb = environment.ssoWeb;
    isStaging = environment.needProtect;
    constructor(@Inject(DOCUMENT) private document: Document, public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {}

    gotoSignup() {
        this.document.location.href = `${environment.ssoWeb}/sign-up`;
    }
}
