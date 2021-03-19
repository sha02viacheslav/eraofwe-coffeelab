import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoffeeLabComponent } from './coffee-lab.component';
import { GoogleViewComponent } from './google-view/google-view.component';

const routes: Routes = [
    {
        path: '',
        component: CoffeeLabComponent,
        children: [
            {
                path: 'google-view',
                component: GoogleViewComponent,
            },
            {
                path: '',
                redirectTo: 'google-view',
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
