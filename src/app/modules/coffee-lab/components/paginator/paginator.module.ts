import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { PaginatorModule } from 'primeng/paginator';

import { PaginatorComponent } from './paginator.component';

@NgModule({
    declarations: [PaginatorComponent],
    exports: [PaginatorComponent],
    imports: [CommonModule, SharedModule, PaginatorModule],
})
export class SeoPaginatorModule {}
