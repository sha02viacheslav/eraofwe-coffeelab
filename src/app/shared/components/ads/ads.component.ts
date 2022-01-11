import { Component, OnInit } from '@angular/core';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit {
    constructor(private dialogSrv: DialogService) {}

    ngOnInit(): void {}
    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
