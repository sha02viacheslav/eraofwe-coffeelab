import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterMap } from '@constants';
import { RouterSlug } from '@enums';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../landing-page/landing-page.module').then((m) => m.LandingPageModule),
    },
    {
        path: ':lang',
        component: OverviewComponent,
        children: [
            {
                path: '',
                redirectTo: 'en/qa-forum',
                pathMatch: 'full',
            },
            {
                path: 'qa-forum',
                loadChildren: () =>
                    import('../qa-forum/qa-forum-view/qa-forum-view.module').then((m) => m.QaForumViewModule),
            },
            {
                path: 'articles',
                loadChildren: () =>
                    import('../articles/articles-view/articles-view.module').then((m) => m.ArticlesViewModule),
            },
            {
                path: 'coffee-recipes',
                loadChildren: () =>
                    import('../coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                        (m) => m.CoffeeRecipesViewModule,
                    ),
            },
            {
                path: 'about-era-of-we',
                loadChildren: () => import('../era-of-we/era-of-we.module').then((m) => m.EraOfWeModule),
            },
            {
                path: `${RouterMap.sv[RouterSlug.QA]}`,

                loadChildren: () =>
                    import('../qa-forum/qa-forum-view/qa-forum-view.module').then((m) => m.QaForumViewModule),
            },
            {
                path: `${RouterMap.sv[RouterSlug.ARTICLE]}`,
                loadChildren: () =>
                    import('../articles/articles-view/articles-view.module').then((m) => m.ArticlesViewModule),
            },
            {
                path: `${RouterMap.sv[RouterSlug.RECIPE]}`,
                loadChildren: () =>
                    import('../coffee-recipes/coffee-recipes-view/coffee-recipes-view.module').then(
                        (m) => m.CoffeeRecipesViewModule,
                    ),
            },
            {
                path: `${RouterMap.sv[RouterSlug.EOW]}`,
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
