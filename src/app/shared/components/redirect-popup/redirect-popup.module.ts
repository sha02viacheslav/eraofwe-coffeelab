import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { RedirectPopupComponent } from './redirect-popup.component';

@NgModule({
    declarations: [RedirectPopupComponent],
    exports: [RedirectPopupComponent],
    imports: [CommonModule, SharedModule, DynamicDialogModule],
    providers: [DialogService],
})
export class RedirectPopupModalModule {}
