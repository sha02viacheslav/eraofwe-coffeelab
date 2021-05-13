import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoffeeLabComponent } from './coffee-lab.component';
import { QaViewComponent } from './google-view/qa-view/qa-view.component';
import { RecipeViewComponent } from './google-view/recipe-view/recipe-view.component';
import { ArticleViewComponent } from './google-view/article-view/article-view.component';

const routes: Routes = [
    {
        path: '',
        component: CoffeeLabComponent,
        children: [
            {
                path: 'qa/:idOrSlug',
                component: QaViewComponent,
            },
            {
                path: ':lang/qa/:idOrSlug',
                component: QaViewComponent,
            },
            {
                path: 'recipe/:idOrSlug',
                component: RecipeViewComponent,
            },
            {
                path: ':lang/recipe/:idOrSlug',
                component: RecipeViewComponent,
            },
            {
                path: 'article/:idOrSlug',
                component: ArticleViewComponent,
            },
            {
                path: ':lang/article/:idOrSlug',
                component: ArticleViewComponent,
            },
            {
                path: '',
                redirectTo: 'recipe',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoffeLabRoutingModule {}
