import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HealthCheckComponent } from '@components';
const userLang = navigator.language;
const lang = userLang === 'sv' || userLang === 'sv-sv' ? 'sv' : 'en';

const routes: Routes = [
    {
        path: '',
        redirectTo: lang,
        pathMatch: 'full',
    },
    { path: 'health-check', component: HealthCheckComponent },
    {
        path: 'en',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/coffee-lab/coffee-lab.module').then((m) => m.CoffeeLabModule),
            },
        ],
    },
    {
        path: 'sv',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/coffee-lab/coffee-lab.module').then((m) => m.CoffeeLabModule),
            },
        ],
    },
    {
        path: 'error',
        loadChildren: () => import('./modules/error-module/error-module.module').then((m) => m.ErrorModuleModule),
    },
    {
        path: '**',
        redirectTo: 'error',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
