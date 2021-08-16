import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-like-divider',
    templateUrl: './like-divider.component.html',
    styleUrls: ['./like-divider.component.scss'],
})
export class LikeDividerComponent implements OnInit {
    @Input() total: any;
    buttonList = [{ button: 'Roasting' }, { button: 'Coffee grinding' }, { button: 'Milling' }, { button: 'Brewing' }];

    constructor(public dialogSrv: DialogService) {}

    ngOnInit(): void {}

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {
            showHeader: false,
            styleClass: 'signup-dialog',
        });
    }
}
