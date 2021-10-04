import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';

import { SignupModalComponent } from './signup-modal.component';

@NgModule({
    declarations: [SignupModalComponent],
    exports: [SignupModalComponent],
    imports: [CommonModule, SharedModule, DynamicDialogModule],
    providers: [DialogService],
})
export class SignupModalModule {}
