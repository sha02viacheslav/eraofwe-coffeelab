import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EraOfWeRoutingModule } from './era-of-we-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '../../components/coffee-lab-components.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';

import { EraOfWeComponent } from './era-of-we.component';

@NgModule({
    declarations: [EraOfWeComponent],
    imports: [CommonModule, EraOfWeRoutingModule, SharedModule, CoffeeLabComponentsModule, UserHeaderModule],
})
export class EraOfWeModule {}
