import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthCheckRoutingModule } from './health-check-routing.module';

import { HealthCheckComponent } from './health-check.component';

@NgModule({
    declarations: [HealthCheckComponent],
    imports: [CommonModule, HealthCheckRoutingModule],
})
export class HealthCheckModule {}
