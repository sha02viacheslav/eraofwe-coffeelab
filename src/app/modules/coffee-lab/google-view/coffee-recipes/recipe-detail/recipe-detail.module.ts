import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeDetailRoutingModule } from './recipe-detail-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@app/modules/coffee-lab/components/coffee-lab-components.module';

import { RecipeDetailComponent } from './recipe-detail.component';

@NgModule({
    declarations: [RecipeDetailComponent],
    imports: [CommonModule, RecipeDetailRoutingModule, SharedModule, CoffeeLabComponentsModule],
})
export class RecipeDetailModule {}
