import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-limit-banner',
    templateUrl: './limit-banner.component.html',
    styleUrls: ['./limit-banner.component.scss'],
})
export class LimitBannerComponent implements OnInit {
    leftCount = 3;
    constructor(private cookieService: CookieService, public dialogSrv: DialogService) {}

    ngOnInit(): void {
        if (!!this.cookieService.get('left_count')) {
            this.leftCount = +this.cookieService.get('left_count');
        }
    }

    onSignup() {
        this.dialogSrv.open(SignupModalComponent, {
            showHeader: false,
            styleClass: 'signup-dialog',
        });
    }
}
