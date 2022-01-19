import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-close-popup',
    templateUrl: './close-popup.component.html',
    styleUrls: ['./close-popup.component.scss'],
})
export class ClosePopupComponent implements OnInit {
    constructor(public ref: DynamicDialogRef) {}

    ngOnInit(): void {}

    close() {
        this.ref.close(null);
    }
}
