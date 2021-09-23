import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { GlobalsService } from '@services';
import { POST_LIMIT_COUNT } from '@constants';

@Component({
    selector: 'app-limit-banner',
    templateUrl: './limit-banner.component.html',
    styleUrls: ['./limit-banner.component.scss'],
})
export class LimitBannerComponent implements OnInit {
    leftCount = POST_LIMIT_COUNT;
    params: any;
    constructor(private globalsService: GlobalsService, public dialogSrv: DialogService) {}

    ngOnInit(): void {
        this.leftCount = this.globalsService.getLimitCounter();
        this.params = {
            limit: this.leftCount,
        };
    }

    onSignup() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
