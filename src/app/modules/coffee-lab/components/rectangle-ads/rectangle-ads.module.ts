import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { RectangleAdsComponent } from './rectangle-ads.component';

@NgModule({
    declarations: [RectangleAdsComponent],
    exports: [RectangleAdsComponent],
    imports: [CommonModule, SharedModule, FormsModule, DynamicDialogModule, ReactiveFormsModule],
    providers: [DialogService],
})
export class RectangleAdsModule {}
