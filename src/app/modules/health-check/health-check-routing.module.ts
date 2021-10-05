import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthCheckComponent } from './health-check.component';

const routes: Routes = [
    {
        path: '',
        component: HealthCheckComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HealthCheckRoutingModule {}
