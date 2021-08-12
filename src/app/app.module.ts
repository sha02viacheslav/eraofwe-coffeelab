import { NgModule, APP_INITIALIZER } from '@angular/core';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localeSe from '@angular/common/locales/se';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import {
    SocialLoginModule,
    SocialAuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from 'angularx-social-login';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HealthCheckComponent, FooterComponent } from '@components';

import { environment } from '@env/environment';

import { StartupService } from '@services';
export function StartupServiceFactory(startupService: StartupService) {
    return () => startupService.load();
}

@NgModule({
    declarations: [AppComponent, LayoutComponent, HealthCheckComponent, FooterComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            positionClass: 'toast-bottom-right',
        }),
        TranslateModule.forRoot(),
        InputTextModule,
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

registerLocaleData(localeSe);
