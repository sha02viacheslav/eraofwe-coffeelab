import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [AppRoutingModule, AppModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppBrowserModule {}
