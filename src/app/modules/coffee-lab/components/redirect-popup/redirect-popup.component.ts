import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-redirect-popup',
    templateUrl: './redirect-popup.component.html',
    styleUrls: ['./redirect-popup.component.scss'],
})
export class RedirectPopupComponent extends DestroyableComponent implements OnInit {
    data: any;
    constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.data = this.config?.data;
    }

    onCancel() {
        const date = new Date();
        date.setTime(date.getTime() + 15 * 60 * 1000);
        const expires = '; expires=' + date.toUTCString();
        document.cookie = 'langChange=set' + expires;
        this.ref.close();
    }

    onApprove() {
        this.router.navigate(['']);
    }
}
