import { NgModule, APP_INITIALIZER } from '@angular/core';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localeSe from '@angular/common/locales/se';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from '@shared';

import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

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
        ReactiveFormsModule,
        SharedModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            positionClass: 'toast-bottom-right',
        }),
        TranslateModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

registerLocaleData(localeSe);
