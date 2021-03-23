import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeLabRoutingModule } from './coffee-lab-routing.module';
import { SharedModule } from '@shared';

import { CoffeeLabComponent } from './coffee-lab.component';
import { RecipeViewComponent } from './google-view/recipe-view/recipe-view.component';
import { QaViewComponent } from './google-view/qa-view/qa-view.component';
import { TranslationDropdownComponent } from './components/translation-dropdown/translation-dropdown.component';

@NgModule({
    declarations: [CoffeeLabComponent, RecipeViewComponent, QaViewComponent, TranslationDropdownComponent],
    imports: [CommonModule, CoffeLabRoutingModule, SharedModule],
})
export class CoffeeLabModule {}
