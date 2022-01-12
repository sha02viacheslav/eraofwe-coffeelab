import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RedirectPopupComponent } from '../redirect-popup/redirect-popup.component';

@Component({
    selector: 'app-close-popup',
    templateUrl: './close-popup.component.html',
    styleUrls: ['./close-popup.component.scss'],
})
export class ClosePopupComponent implements OnInit {
    constructor(private dialogSrv: DialogService, public ref: DynamicDialogRef) {}

    ngOnInit(): void {}

    close() {
        this.ref.close(null);
    }

    onFocus() {
        this.dialogSrv.open(RedirectPopupComponent, {});
    }
}
