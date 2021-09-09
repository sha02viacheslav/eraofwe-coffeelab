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
                component: OverviewComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'en/qa-forum',
                        pathMatch: 'full',
                    },
                    {
                        path: 'en/qa-forum',
                        loadChildren: () =>
                            import('./google-view/qa-forum/qa-forum-view/qa-forum-view.module').then(
                                (m) => m.QaForumViewModule,
                            ),
                    },
                    {
                        path: 'en/articles',
                        loadChildren: () =>
                            import('./google-view/articles/articles-view/articles-view.module').then(
                                (m) => m.ArticlesViewModule,
                            ),
                    },
                    {
                        path: 'en/coffee-recipes',
                        loadChildren: () =>
                            import('./google-view/coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                                (m) => m.CoffeeRecipesViewModule,
                            ),
                    },
                    {
                        path: 'en/about-era-of-we',
                        loadChildren: () =>
                            import('./google-view/era-of-we/era-of-we.module').then((m) => m.EraOfWeModule),
                    },
                    {
                        path: `sv/${RouterMap.sv[RouterSlug.QA]}`,

                        loadChildren: () =>
                            import('./google-view/qa-forum/qa-forum-view/qa-forum-view.module').then(
                                (m) => m.QaForumViewModule,
                            ),
                    },
                    {
                        path: `sv/${RouterMap.sv[RouterSlug.ARTICLE]}`,
                        loadChildren: () =>
                            import('./google-view/articles/articles-view/articles-view.module').then(
                                (m) => m.ArticlesViewModule,
                            ),
                    },
                    {
                        path: `sv/${RouterMap.sv[RouterSlug.RECIPE]}`,
                        loadChildren: () =>
                            import('./google-view/coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                                (m) => m.CoffeeRecipesViewModule,
                            ),
                    },
                    {
                        path: `sv/${RouterMap.sv[RouterSlug.EOW]}`,
                        loadChildren: () =>
                            import('./google-view/era-of-we/era-of-we.module').then((m) => m.EraOfWeModule),
                    },
                    {
                        path: 'pt-br/qa-forum',
                        loadChildren: () =>
                            import('./google-view/qa-forum/qa-forum-view/qa-forum-view.module').then(
                                (m) => m.QaForumViewModule,
                            ),
                    },
                    {
                        path: 'pt-br/articles',
                        loadChildren: () =>
                            import('./google-view/articles/articles-view/articles-view.module').then(
                                (m) => m.ArticlesViewModule,
                            ),
                    },
                    {
                        path: 'pt-br/coffee-recipes',
                        loadChildren: () =>
                            import('./google-view/coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                                (m) => m.CoffeeRecipesViewModule,
                            ),
                    },
                    {
                        path: 'pt-br/about-era-of-we',
                        loadChildren: () =>
                            import('./google-view/era-of-we/era-of-we.module').then((m) => m.EraOfWeModule),
                    },
                    {
                        path: 'es/qa-forum',
                        loadChildren: () =>
                            import('./google-view/qa-forum/qa-forum-view/qa-forum-view.module').then(
                                (m) => m.QaForumViewModule,
                            ),
                    },
                    {
                        path: 'es/articles',
                        loadChildren: () =>
                            import('./google-view/articles/articles-view/articles-view.module').then(
                                (m) => m.ArticlesViewModule,
                            ),
                    },
                    {
                        path: 'es/coffee-recipes',
                        loadChildren: () =>
                            import('./google-view/coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                                (m) => m.CoffeeRecipesViewModule,
                            ),
                    },
                    {
                        path: 'es/about-era-of-we',
                        loadChildren: () =>
                            import('./google-view/era-of-we/era-of-we.module').then((m) => m.EraOfWeModule),
                    },
                ],
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
