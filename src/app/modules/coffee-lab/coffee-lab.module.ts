import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeLabRoutingModule } from './coffee-lab-routing.module';
import { SharedModule } from '@shared';

import { GoogleViewComponent } from './google-view/google-view.component';
import { CoffeeLabComponent } from './coffee-lab.component';

@NgModule({
    declarations: [GoogleViewComponent, CoffeeLabComponent],
    imports: [CommonModule, CoffeLabRoutingModule, SharedModule],
})
export class CoffeeLabModule {}
