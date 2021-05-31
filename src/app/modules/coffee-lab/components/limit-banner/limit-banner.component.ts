import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-limit-banner',
    templateUrl: './limit-banner.component.html',
    styleUrls: ['./limit-banner.component.scss'],
})
export class LimitBannerComponent implements OnInit {
    leftCount = 3;
    constructor(private globalsService: GlobalsService, public dialogSrv: DialogService) {}

    ngOnInit(): void {
        this.leftCount = this.globalsService.getLimitCounter();
    }

    onSignup() {
        this.dialogSrv.open(SignupModalComponent, {
            showHeader: false,
            styleClass: 'signup-dialog',
        });
    }
}
