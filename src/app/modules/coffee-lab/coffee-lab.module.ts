import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from '@components';
import { SharedModule } from '@shared';
import { CoffeLabRoutingModule } from './coffee-lab-routing.module';
import { CoffeeLabComponent } from './coffee-lab.component';

@NgModule({
    declarations: [CoffeeLabComponent, FooterComponent],
    imports: [CommonModule, CoffeLabRoutingModule, SharedModule],
})
export class CoffeeLabModule {}
