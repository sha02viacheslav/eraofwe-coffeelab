import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryArticleComponent } from './category-article/category-article.component';
import { CategoryQAComponent } from './category-qa/category-qa.component';
import { CategoryRecipeComponent } from './category-recipe/category-recipe.component';
import { CategoryComponent } from './category.component';

const routes: Routes = [
    {
        path: '',
        component: CategoryComponent,
        children: [
            {
                path: 'qa-forum',
                component: CategoryQAComponent,
            },
            {
                path: 'articles',
                component: CategoryArticleComponent,
            },
            {
                path: 'coffee-recipes',
                component: CategoryRecipeComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryRoutingModule {}
