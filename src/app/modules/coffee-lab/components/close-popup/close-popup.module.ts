import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SquareAdsModule } from '../square-ads/square-ads.module';
import { ClosePopupComponent } from './close-popup.component';

@NgModule({
    declarations: [ClosePopupComponent],
    exports: [ClosePopupComponent],
    imports: [CommonModule, SharedModule, SquareAdsModule, DynamicDialogModule],
    providers: [DialogService],
})
export class ClosePopupModule {}
