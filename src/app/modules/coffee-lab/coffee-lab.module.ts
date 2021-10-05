import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeLabRoutingModule } from './coffee-lab-routing.module';
import { SharedModule } from '@shared';

import { CoffeeLabComponent } from './coffee-lab.component';
import { FooterComponent } from '@components';

@NgModule({
    declarations: [CoffeeLabComponent, FooterComponent],
    imports: [CommonModule, CoffeLabRoutingModule, SharedModule],
})
export class CoffeeLabModule {}
