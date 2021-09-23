import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoffeeLabComponent } from './coffee-lab.component';
import { OverviewComponent } from './google-view/overview/overview.component';
import { RouterMap } from '@constants';
import { RouterSlug } from '@enums';

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
                path: ':lang/qa-forum/:idOrSlug',
                loadChildren: () =>
                    import('./google-view/qa-forum/question-detail/question-detail.module').then(
                        (m) => m.QuestionDetailModule,
                    ),
            },
            {
                path: ':lang/coffee-recipes/:idOrSlug',
                loadChildren: () =>
                    import('./google-view/coffee-recipes/recipe-detail/recipe-detail.module').then(
                        (m) => m.RecipeDetailModule,
                    ),
            },
            {
                path: ':lang/articles/:idOrSlug',
                loadChildren: () =>
                    import('./google-view/articles/article-detail/article-detail.module').then(
                        (m) => m.ArticleDetailModule,
                    ),
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
