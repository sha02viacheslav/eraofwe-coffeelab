import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { RectangleAdsComponent } from './rectangle-ads.component';

@NgModule({
    declarations: [RectangleAdsComponent],
    exports: [RectangleAdsComponent],
    imports: [CommonModule, SharedModule, FormsModule, DynamicDialogModule],
    providers: [DialogService],
})
export class RectangleAdsModule {}
