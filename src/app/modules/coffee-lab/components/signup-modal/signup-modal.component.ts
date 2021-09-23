import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { environment } from '@env/environment';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { UserService } from '@services';
import { DestroyableComponent } from '@base-components';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-signup-modal',
    templateUrl: './signup-modal.component.html',
    styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent extends DestroyableComponent implements OnInit {
    ssoWeb = environment.ssoWeb;
    isStaging = environment.needProtect;
    isReady = false;
    constructor(
        private authService: SocialAuthService,
        private toastr: ToastrService,
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
        this.authService.authState.subscribe((user) => {});
        this.authService.authState.pipe(takeUntil(this.unsubscribeAll$)).subscribe((socialRes) => {
            this.socialLogin(socialRes);
        });
        this.authService.initState.subscribe((res) => {
            this.isReady = res;
        });
    }

    close(value = null) {
        this.ref.close(value);
    }

    signInWithGoogle(): void {
        if (this.isReady) {
            this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        } else {
            this.toastr.error(this.translator.instant('common_error'));
        }
    }

    signInWithFacebook(): void {
        if (this.isReady) {
            this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        } else {
            this.toastr.error(this.translator.instant('common_error'));
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
                    this.toastr.error(this.translator.instant('email_already_exists_in_another_app'));
                } else {
                    this.toastr.error(this.translator.instant('common_error'));
                }
            }
        });
    }
}
