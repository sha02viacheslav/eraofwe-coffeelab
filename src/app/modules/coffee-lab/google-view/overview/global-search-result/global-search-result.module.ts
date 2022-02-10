import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticlesComponent } from '@modules/coffee-lab/components/articles/articles.component';
import { ArticlesModule } from '@modules/coffee-lab/components/articles/articles.module';
import { QuestionsComponent } from '@modules/coffee-lab/components/questions/questions.component';
import { QuestionsModule } from '@modules/coffee-lab/components/questions/questions.module';
import { RecipesComponent } from '@modules/coffee-lab/components/recipes/recipes.component';
import { RecipesModule } from '@modules/coffee-lab/components/recipes/recipes.module';
import { SharedModule } from '@shared';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { GlobalSearchResultComponent } from './global-search-result.component';

@NgModule({
    declarations: [GlobalSearchResultComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        TabMenuModule,
        InputTextModule,
        DropdownModule,
        QuestionsModule,
        ArticlesModule,
        RecipesModule,
    ],
    exports: [GlobalSearchResultComponent],
})
export class GlobalSearchResultModule {}
