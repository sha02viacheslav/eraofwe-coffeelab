import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { SeoPaginatorModule } from '@modules/coffee-lab/components/paginator/paginator.module';
import { LanguageDropdownModule } from '@modules/coffee-lab/components/language-dropdown/language-dropdown.module';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CategoryComponent } from './category.component';
import { CategoryListModule } from '@modules/coffee-lab/components/category-list/category-list.module';
import { SignupModalModule } from '@modules/coffee-lab/components/signup-modal/signup-modal.module';
import { QuestionsModule } from '@modules/coffee-lab/components/questions/questions.module';
import { FormsModule } from '@angular/forms';
import { ArticlesModule } from '@modules/coffee-lab/components/articles/articles.module';
import { RecipesModule } from '@modules/coffee-lab/components/recipes/recipes.module';

@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        FormsModule,
        SharedModule,
        UserHeaderModule,
        SeoPaginatorModule,
        NgxJsonLdModule,
        DropdownModule,
        CategoryListModule,
        SignupModalModule,
        TabViewModule,
        LanguageDropdownModule,
        OverlayPanelModule,
        QuestionsModule,
        ArticlesModule,
        RecipesModule,
    ],
})
export class CategoryModule {}
