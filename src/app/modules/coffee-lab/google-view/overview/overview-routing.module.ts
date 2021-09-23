import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterMap } from '@constants';
import { RouterSlug } from '@enums';

import { OverviewComponent } from './overview.component';

const routes: Routes = [
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
                    import('../qa-forum/qa-forum-view/qa-forum-view.module').then((m) => m.QaForumViewModule),
            },
            {
                path: 'en/articles',
                loadChildren: () =>
                    import('../articles/articles-view/articles-view.module').then((m) => m.ArticlesViewModule),
            },
            {
                path: 'en/coffee-recipes',
                loadChildren: () =>
                    import('../coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                        (m) => m.CoffeeRecipesViewModule,
                    ),
            },
            {
                path: 'en/about-era-of-we',
                loadChildren: () => import('../era-of-we/era-of-we.module').then((m) => m.EraOfWeModule),
            },
            {
                path: `sv/${RouterMap.sv[RouterSlug.QA]}`,

                loadChildren: () =>
                    import('../qa-forum/qa-forum-view/qa-forum-view.module').then((m) => m.QaForumViewModule),
            },
            {
                path: `sv/${RouterMap.sv[RouterSlug.ARTICLE]}`,
                loadChildren: () =>
                    import('../articles/articles-view/articles-view.module').then((m) => m.ArticlesViewModule),
            },
            {
                path: `sv/${RouterMap.sv[RouterSlug.RECIPE]}`,
                loadChildren: () =>
                    import('../coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                        (m) => m.CoffeeRecipesViewModule,
                    ),
            },
            {
                path: `sv/${RouterMap.sv[RouterSlug.EOW]}`,
                loadChildren: () => import('../era-of-we/era-of-we.module').then((m) => m.EraOfWeModule),
            },
            {
                path: 'pt-br/qa-forum',
                loadChildren: () =>
                    import('../qa-forum/qa-forum-view/qa-forum-view.module').then((m) => m.QaForumViewModule),
            },
            {
                path: 'pt-br/articles',
                loadChildren: () =>
                    import('../articles/articles-view/articles-view.module').then((m) => m.ArticlesViewModule),
            },
            {
                path: 'pt-br/coffee-recipes',
                loadChildren: () =>
                    import('../coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                        (m) => m.CoffeeRecipesViewModule,
                    ),
            },
            {
                path: 'pt-br/about-era-of-we',
                loadChildren: () => import('../era-of-we/era-of-we.module').then((m) => m.EraOfWeModule),
            },
            {
                path: 'es/qa-forum',
                loadChildren: () =>
                    import('../qa-forum/qa-forum-view/qa-forum-view.module').then((m) => m.QaForumViewModule),
            },
            {
                path: 'es/articles',
                loadChildren: () =>
                    import('../articles/articles-view/articles-view.module').then((m) => m.ArticlesViewModule),
            },
            {
                path: 'es/coffee-recipes',
                loadChildren: () =>
                    import('../coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                        (m) => m.CoffeeRecipesViewModule,
                    ),
            },
            {
                path: 'es/about-era-of-we',
                loadChildren: () => import('../era-of-we/era-of-we.module').then((m) => m.EraOfWeModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OverviewRoutingModule {}
