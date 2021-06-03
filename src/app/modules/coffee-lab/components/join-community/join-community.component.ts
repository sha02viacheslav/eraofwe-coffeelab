import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
    constructor(@Inject(DOCUMENT) private document: Document, public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {}

    gotoSignup() {
        this.document.location.href = `${environment.ssoWeb}/sign-up`;
    }
}
