import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckComponent } from '@components';

const routes: Routes = [
    { path: 'health-check', component: HealthCheckComponent },
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
