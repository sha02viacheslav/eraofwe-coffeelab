import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EraOfWeComponent } from './era-of-we.component';

const routes: Routes = [
    {
        path: '',
        component: EraOfWeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EraOfWeRoutingModule {}
