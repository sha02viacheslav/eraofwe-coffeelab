import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-close-popup',
    templateUrl: './close-popup.component.html',
    styleUrls: ['./close-popup.component.scss'],
})
export class ClosePopupComponent implements OnInit {
    showAd: any;
    constructor(public ref: DynamicDialogRef, private coffeLabService: CoffeeLabService) {
        this.coffeLabService.showAd.subscribe((res) => {
            this.showAd = res;
        });
    }

    ngOnInit(): void {}

    close() {
        this.ref.close(null);
    }
}
