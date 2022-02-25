import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleCardModule } from '@modules/coffee-lab/components/article-card/article-card.module';
import { CategoryListModule } from '@modules/coffee-lab/components/category-list/category-list.module';
import { QuestionsCardModule } from '@modules/coffee-lab/components/question-card/question-card.module';
import { RecipeCardModule } from '@modules/coffee-lab/components/recipe-card/recipe-card.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { SharedModule } from '@shared';
import { TabViewModule } from 'primeng/tabview';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { ErrorModuleRoutingModule } from './error-module-routing.module';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { NoInternetConnectionComponent } from './no-internet-connection/no-internet-connection.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostNotFoundComponent } from './post-not-found/post-not-found.component';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        NoInternetConnectionComponent,
        InternalServerErrorComponent,
        PostNotFoundComponent,
    ],
    imports: [
        CommonModule,
        ErrorModuleRoutingModule,
        FooterModule,
        HeaderModule,
        TabViewModule,
        SharedModule,
        ArticleCardModule,
        RecipeCardModule,
        QuestionsCardModule,
        CategoryListModule,
        UserHeaderModule,
    ],
})
export class ErrorModuleModule {}
