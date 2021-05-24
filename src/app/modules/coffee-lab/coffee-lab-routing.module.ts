import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoffeeLabComponent } from './coffee-lab.component';
import { QaViewComponent } from './google-view/qa-view/qa-view.component';
import { RecipeViewComponent } from './google-view/recipe-view/recipe-view.component';
import { ArticleViewComponent } from './google-view/article-view/article-view.component';
import { EraOfWeComponent } from './google-view/era-of-we/era-of-we.component';

const routes: Routes = [
    {
        path: '',
        component: CoffeeLabComponent,
        children: [
            {
                path: 'qa',
                component: QaViewComponent,
            },
            {
                path: 'qa/:idOrSlug',
                component: QaViewComponent,
            },
            {
                path: ':lang/qa',
                component: QaViewComponent,
            },
            {
                path: ':lang/qa/:idOrSlug',
                component: QaViewComponent,
            },
            {
                path: 'recipe',
                component: RecipeViewComponent,
            },
            {
                path: 'recipe/:idOrSlug',
                component: RecipeViewComponent,
            },
            {
                path: ':lang/recipe',
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
                path: 'article',
                component: ArticleViewComponent,
            },
            {
                path: ':lang/article/:idOrSlug',
                component: ArticleViewComponent,
            },
            {
                path: ':lang/article',
                component: ArticleViewComponent,
            },
            {
                path: 'about-era-of-we',
                component: EraOfWeComponent,
            },
            {
                path: '',
                redirectTo: 'qa',
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
