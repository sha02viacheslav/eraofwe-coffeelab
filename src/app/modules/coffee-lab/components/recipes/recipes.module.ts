import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { RecipesComponent } from './recipes.component';
import { SeoPaginatorModule } from '../paginator/paginator.module';
import { RecipeCardModule } from '../recipe-card/recipe-card.module';

@NgModule({
    declarations: [RecipesComponent],
    exports: [RecipesComponent],
    imports: [CommonModule, SharedModule, SeoPaginatorModule, RecipeCardModule],
})
export class RecipesModule {}
