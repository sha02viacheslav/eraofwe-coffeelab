import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@services';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-signup-modal',
    templateUrl: './signup-modal.component.html',
    styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent extends DestroyableComponent implements OnInit {
    ssoWeb = environment.ssoWeb;
    isStaging = environment.needProtect;
    isReady = false;
    errorMsg: string;

    constructor(
        private authService: SocialAuthService,
        private translator: TranslateService,
        private userService: UserService,
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
    ) {
        super();
        this.config.showHeader = false;
        this.config.styleClass = 'signup-dialog';
    }

    ngOnInit(): void {
        this.authService.authState.pipe(takeUntil(this.unsubscribeAll$)).subscribe((socialRes) => {
            this.socialLogin(socialRes);
        });
        this.authService.initState.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res) => {
            this.isReady = res;
        });
    }

    close(value = null) {
        this.ref.close(value);
    }

    signInWithGoogle(): void {
        if (this.isReady) {
            this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        }
    }

    signInWithFacebook(): void {
        if (this.isReady) {
            this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        }
    }

    socialLogin(socialRes: any) {
        const postData: any = {
            firstname: socialRes.firstName,
            lastname: socialRes.lastName,
            email: socialRes.email,
            token: socialRes.idToken,
        };
        if (socialRes.provider === 'GOOGLE') {
            postData.google_id = socialRes.id;
        } else {
            postData.facebook_id = socialRes.id;
        }

        this.userService.socialLogin(postData).subscribe((res: any) => {
            if (res.success === true) {
                window.open(`${environment.consumerWeb}/coffee-lab`, '_self');
            } else {
                if (res.messages?.email?.includes('already_exists_in_another_app')) {
                    this.errorMsg = this.translator.instant('email_already_exists_in_another_app');
                    setTimeout(() => {
                        this.errorMsg = null;
                    }, 2000);
                }
            }
        });
    }
}
