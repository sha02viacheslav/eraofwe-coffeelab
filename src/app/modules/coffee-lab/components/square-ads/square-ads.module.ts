import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SquareAdsComponent } from './square-ads.component';

@NgModule({
    declarations: [SquareAdsComponent],
    exports: [SquareAdsComponent],
    imports: [CommonModule, SharedModule, DynamicDialogModule],
    providers: [DialogService],
})
export class SquareAdsModule {}
