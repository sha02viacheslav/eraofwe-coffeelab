import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoffeeRecipesViewRoutingModule } from './coffee-recipes-view-routing.module';
import { SharedModule } from '@shared';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { CoffeeRecipesViewComponent } from './coffee-recipes-view.component';
import { RecipesModule } from '@modules/coffee-lab/components/recipes/recipes.module';

@NgModule({
    declarations: [CoffeeRecipesViewComponent],
    imports: [
        CommonModule,
        FormsModule,
        CoffeeRecipesViewRoutingModule,
        SharedModule,
        NgxJsonLdModule,
        InputTextModule,
        DropdownModule,
        RecipesModule,
    ],
})
export class CoffeeRecipesViewModule {}
