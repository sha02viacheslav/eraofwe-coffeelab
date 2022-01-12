import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-redirect-popup',
    templateUrl: './redirect-popup.component.html',
    styleUrls: ['./redirect-popup.component.scss'],
})
export class RedirectPopupComponent extends DestroyableComponent implements OnInit {
    data: any;
    constructor(public config: DynamicDialogConfig) {
        super();
    }

    ngOnInit(): void {
        this.data = this.config?.data;
    }
}
