import { NgModule, APP_INITIALIZER } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import {
    SocialLoginModule,
    SocialAuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from 'angularx-social-login';

import { AppComponent } from './app.component';

import { StartupService } from '@services';
export function StartupServiceFactory(startupService: StartupService) {
    return () => startupService.load();
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        AppRoutingModule,
        TransferHttpCacheModule,
        HttpClientModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            preventDuplicates: true,
            positionClass: 'toast-bottom-right',
            closeButton: true,
            tapToDismiss: false,
        }),
        TranslateModule.forRoot(),
        SocialLoginModule,
    ],
    providers: [
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true,
        },
        { provide: APP_BASE_HREF, useValue: '/coffee-lab' },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '899330219942-0iv0tk5mmkjlt9v9effbgvgufl5ukquk.apps.googleusercontent.com',
                        ),
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('737251000291479'),
                    },
                ],
            } as SocialAuthServiceConfig,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
