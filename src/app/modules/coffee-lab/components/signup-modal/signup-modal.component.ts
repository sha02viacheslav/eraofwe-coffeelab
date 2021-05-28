import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { environment } from '@env/environment';

@Component({
    selector: 'app-signup-modal',
    templateUrl: './signup-modal.component.html',
    styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent implements OnInit {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {}

    close(value = null) {
        this.ref.close(value);
    }

    signupWithGoogle() {
        this.close();
    }
    signupWithFacebook() {
        this.close();
    }
    gotoLogin() {
        this.document.location.href = `${environment.ssoWeb}/login`;
    }
    gotoSignup() {
        this.document.location.href = `${environment.ssoWeb}/sign-up`;
    }
}
