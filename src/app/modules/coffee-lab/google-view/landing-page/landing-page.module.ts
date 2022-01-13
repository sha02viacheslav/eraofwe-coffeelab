import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
    declarations: [LandingPageComponent],
    imports: [CommonModule, LandingPageRoutingModule],
})
export class LandingPageModule {}
