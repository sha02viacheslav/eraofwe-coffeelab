import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { environment } from '@env/environment';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

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
        private authService: SocialAuthService,
    ) {}

    ngOnInit(): void {
        this.authService.authState.subscribe((user) => {
            console.log(user);
        });
    }

    close(value = null) {
        this.ref.close(value);
    }

    gotoLogin() {
        this.document.location.href = `${environment.ssoWeb}/login`;
    }
    gotoSignup() {
        this.document.location.href = `${environment.ssoWeb}/email-signup`;
    }
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFacebook(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
}
