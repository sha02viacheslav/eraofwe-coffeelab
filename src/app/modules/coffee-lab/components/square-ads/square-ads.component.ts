import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-square-ads',
    templateUrl: './square-ads.component.html',
    styleUrls: ['./square-ads.component.scss'],
})
export class SquareAdsComponent extends DestroyableComponent implements OnInit {
    constructor(private dialogSrv: DialogService, public ref: DynamicDialogRef) {
        super();
    }

    ngOnInit(): void {}

    close(value = null) {
        this.ref.close(value);
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
