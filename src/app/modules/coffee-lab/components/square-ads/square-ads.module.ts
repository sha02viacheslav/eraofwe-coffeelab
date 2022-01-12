import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SquareAdsComponent } from './square-ads.component';

@NgModule({
    declarations: [SquareAdsComponent],
    exports: [SquareAdsComponent],
    imports: [CommonModule, SharedModule],
})
export class SquareAdsModule {}
