import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleCardModule } from '@modules/coffee-lab/components/article-card/article-card.module';
import { CategoryListModule } from '@modules/coffee-lab/components/category-list/category-list.module';
import { LanguageDropdownModule } from '@modules/coffee-lab/components/language-dropdown/language-dropdown.module';
import { QuestionsCardModule } from '@modules/coffee-lab/components/question-card/question-card.module';
import { RecipeCardModule } from '@modules/coffee-lab/components/recipe-card/recipe-card.module';
import { SignupModalModule } from '@modules/coffee-lab/components/signup-modal/signup-modal.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { SharedModule } from '@shared';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
    declarations: [CategoryComponent, CategoryPostsComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        FormsModule,
        SharedModule,
        UserHeaderModule,
        NgxJsonLdModule,
        DropdownModule,
        CategoryListModule,
        SignupModalModule,
        TabViewModule,
        TabMenuModule,
        LanguageDropdownModule,
        OverlayPanelModule,
        QuestionsCardModule,
        ArticleCardModule,
        RecipeCardModule,
        PaginatorModule,
    ],
})
export class CategoryModule {}
