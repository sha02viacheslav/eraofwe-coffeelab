import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeLabRoutingModule } from './coffee-lab-routing.module';
import { SharedModule } from '@shared';

import { CoffeeLabComponent } from './coffee-lab.component';
import { FooterComponent } from '@components';
import { FooterAdsComponent } from './components/footer-ads/footer-ads.component';

@NgModule({
    declarations: [CoffeeLabComponent, FooterComponent, FooterAdsComponent],
    imports: [CommonModule, CoffeLabRoutingModule, SharedModule],
})
export class CoffeeLabModule {}
