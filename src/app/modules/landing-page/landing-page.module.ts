import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
    declarations: [LandingPageComponent],
    imports: [CommonModule, LandingPageRoutingModule, AccordionModule],
})
export class LandingPageModule {}
