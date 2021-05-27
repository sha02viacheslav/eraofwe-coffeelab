import { Component, OnInit, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
    @Input() type: string;

    constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {}

    ngOnInit(): void {}

    exploreCoffeeLab() {
        this.router.navigate([`/overview/${this.type}`]);
    }

    gotoSignup() {
        this.document.location.href = `${environment.ssoWeb}/sign-up`;
    }
}
