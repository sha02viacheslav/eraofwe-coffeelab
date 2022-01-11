import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { RedirectPopupComponent } from '../redirect-popup/redirect-popup.component';

@Component({
    selector: 'app-square-ads',
    templateUrl: './square-ads.component.html',
    styleUrls: ['./square-ads.component.scss'],
})
export class SquareAdsComponent implements OnInit {
    constructor(private dialogSrv: DialogService) {}

    ngOnInit(): void {}

    close() {}

    onFocus() {
        this.dialogSrv.open(RedirectPopupComponent, {});
    }
}
