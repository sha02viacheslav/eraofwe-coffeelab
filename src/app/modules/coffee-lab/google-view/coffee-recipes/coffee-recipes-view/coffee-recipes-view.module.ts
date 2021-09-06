import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeRecipesViewRoutingModule } from './coffee-recipes-view-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@app/modules/coffee-lab/components/coffee-lab-components.module';

import { CoffeeRecipesViewComponent } from './coffee-recipes-view.component';

@NgModule({
    declarations: [CoffeeRecipesViewComponent],
    imports: [CommonModule, CoffeeRecipesViewRoutingModule, SharedModule, CoffeeLabComponentsModule],
})
export class CoffeeRecipesViewModule {}
