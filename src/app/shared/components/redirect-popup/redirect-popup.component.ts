import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';

@Component({
    selector: 'app-redirect-popup',
    templateUrl: './redirect-popup.component.html',
    styleUrls: ['./redirect-popup.component.scss'],
})
export class RedirectPopupComponent extends DestroyableComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {}
}
