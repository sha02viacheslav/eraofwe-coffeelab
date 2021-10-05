import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EraOfWeRoutingModule } from './era-of-we-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { EraOfWeComponent } from './era-of-we.component';

@NgModule({
    declarations: [EraOfWeComponent],
    imports: [
        CommonModule,
        FormsModule,
        EraOfWeRoutingModule,
        SharedModule,
        UserHeaderModule,
        InputTextModule,
        DropdownModule,
    ],
})
export class EraOfWeModule {}
