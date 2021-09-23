import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeLabRoutingModule } from './coffee-lab-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from './components/coffee-lab-components.module';

import { CoffeeLabComponent } from './coffee-lab.component';

@NgModule({
    declarations: [CoffeeLabComponent],
    imports: [CommonModule, CoffeLabRoutingModule, SharedModule, CoffeeLabComponentsModule],
})
export class CoffeeLabModule {}
