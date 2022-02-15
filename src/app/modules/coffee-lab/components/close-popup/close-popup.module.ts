import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SquareAdsModule } from '@modules/coffee-lab/components/square-ads/square-ads.module';
import { SharedModule } from '@shared';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ClosePopupComponent } from './close-popup.component';

@NgModule({
    declarations: [ClosePopupComponent],
    exports: [ClosePopupComponent],
    imports: [CommonModule, SharedModule, SquareAdsModule, DynamicDialogModule],
    providers: [DialogService],
})
export class ClosePopupModule {}
