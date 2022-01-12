import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClosePopupModule } from '@modules/coffee-lab/components/close-popup/close-popup.module';
import { SquareAdsModule } from '@modules/coffee-lab/components/square-ads/square-ads.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateModule } from '@ngx-translate/core';
import { StartupService } from '@services';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialAuthServiceConfig,
    SocialLoginModule,
} from 'angularx-social-login';
import { DialogService } from 'primeng/dynamicdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
        TranslateModule.forRoot(),
        SocialLoginModule,
        ClosePopupModule,
        SquareAdsModule,
    ],
    providers: [
        StartupService,
        DialogService,
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
