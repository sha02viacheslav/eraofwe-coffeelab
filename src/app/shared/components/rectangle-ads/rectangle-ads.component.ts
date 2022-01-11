import { Component, OnInit } from '@angular/core';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { RedirectPopupComponent } from '../redirect-popup/redirect-popup.component';
import { SquareAdsComponent } from '../square-ads/square-ads.component';

@Component({
    selector: 'app-rectangle-ads',
    templateUrl: './rectangle-ads.component.html',
    styleUrls: ['./rectangle-ads.component.scss'],
})
export class RectangleAdsComponent implements OnInit {
    constructor(private dialogSrv: DialogService) {}

    ngOnInit(): void {}

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
    onPopup() {
        this.dialogSrv.open(SquareAdsComponent, {});
    }
}
