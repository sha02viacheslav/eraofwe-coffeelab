import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeDetailRoutingModule } from './recipe-detail-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@modules/coffee-lab/components/coffee-lab-components.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { TranslationDropdownModule } from '@modules/coffee-lab/components/translation-dropdown/translation-dropdown.module';

import { RecipeDetailComponent } from './recipe-detail.component';

@NgModule({
    declarations: [RecipeDetailComponent],
    imports: [
        CommonModule,
        RecipeDetailRoutingModule,
        SharedModule,
        CoffeeLabComponentsModule,
        UserHeaderModule,
        TranslationDropdownModule,
    ],
})
export class RecipeDetailModule {}
