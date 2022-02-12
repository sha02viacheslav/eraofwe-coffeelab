import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticlesModule } from '@modules/coffee-lab/components/articles/articles.module';
import { LanguageDropdownModule } from '@modules/coffee-lab/components/language-dropdown/language-dropdown.module';
import { QuestionsModule } from '@modules/coffee-lab/components/questions/questions.module';
import { RecipesModule } from '@modules/coffee-lab/components/recipes/recipes.module';
import { SharedModule } from '@shared';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { GlobalSearchRoutingModule } from './global-search-routing.module';
import { GlobalSearchComponent } from './global-search.component';

@NgModule({
    declarations: [GlobalSearchComponent],
    imports: [
        CommonModule,
        SharedModule,
        GlobalSearchRoutingModule,
        FormsModule,
        InputTextModule,
        TabViewModule,
        QuestionsModule,
        ArticlesModule,
        RecipesModule,
        DropdownModule,
        MultiSelectModule,
        LanguageDropdownModule,
    ],
})
export class GlobalSearchModule {}
