import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeLabRoutingModule } from './coffee-lab-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from './components/coffee-lab-components.module';

import { CoffeeLabComponent } from './coffee-lab.component';
import { OverviewComponent } from './google-view/overview/overview.component';

@NgModule({
    declarations: [CoffeeLabComponent, OverviewComponent],
    imports: [CommonModule, CoffeLabRoutingModule, SharedModule, CoffeeLabComponentsModule],
})
export class CoffeeLabModule {}
