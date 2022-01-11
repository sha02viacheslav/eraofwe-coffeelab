import { Component, OnInit } from '@angular/core';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { RedirectPopupComponent } from '../redirect-popup/redirect-popup.component';

@Component({
    selector: 'app-rectangle-ads',
    templateUrl: './rectangle-ads.component.html',
    styleUrls: ['./rectangle-ads.component.scss'],
})
export class RectangleAdsComponent implements OnInit {
    constructor(private dialogSrv: DialogService) {}

    ngOnInit(): void {}

    onPopup() {
        this.dialogSrv.open(RedirectPopupComponent, {});
    }
}
