import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'health-check',
        loadChildren: () => import('./modules/health-check/health-check.module').then((m) => m.HealthCheckModule),
    },
    {
        path: 'error',
        loadChildren: () => import('./modules/error-module/error-module.module').then((m) => m.ErrorModuleModule),
    },
    {
        path: '',
        loadChildren: () => import('./modules/coffee-lab/coffee-lab.module').then((m) => m.CoffeeLabModule),
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
