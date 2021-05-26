import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngOnInit(): void {}

    gotoLogin() {
        this.document.location.href = `${environment.ssoWeb}/login`;
    }

    gotoSignup() {
        this.document.location.href = `${environment.ssoWeb}/sign-up`;
    }
}
