import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoffeeLabComponent } from './coffee-lab.component';

const routes: Routes = [
    {
        path: '',
        component: CoffeeLabComponent,
        children: [
            {
                path: 'user-profile',
                loadChildren: () => import('./user-profile/user-profile.module').then((m) => m.UserProfileModule),
            },
            {
                path: '',
                loadChildren: () => import('./google-view/overview/overview.module').then((m) => m.OverviewModule),
            },
            {
                path: 'qa-forum/:idOrSlug',
                loadChildren: () =>
                    import('./google-view/qa-forum/question-detail/question-detail.module').then(
                        (m) => m.QuestionDetailModule,
                    ),
            },
            {
                path: 'coffee-recipes/:idOrSlug',
                loadChildren: () =>
                    import('./google-view/coffee-recipes/recipe-detail/recipe-detail.module').then(
                        (m) => m.RecipeDetailModule,
                    ),
            },
            {
                path: 'articles/:idOrSlug',
                loadChildren: () =>
                    import('./google-view/articles/article-detail/article-detail.module').then(
                        (m) => m.ArticleDetailModule,
                    ),
            },
            {
                path: ':category',
                loadChildren: () => import('./google-view/category/category.module').then((m) => m.CategoryModule),
            },
            { path: '**', redirectTo: 'en/qa-forum' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoffeLabRoutingModule {}
