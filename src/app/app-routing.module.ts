import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HealthCheckComponent } from '@components';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'coffee-lab',
                loadChildren: () => import('./modules/coffee-lab/coffee-lab.module').then((m) => m.CoffeeLabModule),
            },
            { path: '', redirectTo: 'coffee-lab', pathMatch: 'full' },
        ],
    },
    { path: 'health-check', component: HealthCheckComponent },
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
