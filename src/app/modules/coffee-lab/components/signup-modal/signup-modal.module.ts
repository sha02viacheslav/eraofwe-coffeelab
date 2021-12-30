import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { SignupModalComponent } from './signup-modal.component';

@NgModule({
    declarations: [SignupModalComponent],
    exports: [SignupModalComponent],
    imports: [CommonModule, SharedModule, DynamicDialogModule],
    providers: [DialogService],
})
export class SignupModalModule {}
