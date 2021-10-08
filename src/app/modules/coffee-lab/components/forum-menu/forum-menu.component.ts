import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-forum-menu',
    templateUrl: './forum-menu.component.html',
    styleUrls: ['./forum-menu.component.scss'],
})
export class ForumMenuComponent implements OnInit {
    constructor(public dialogSrv: DialogService, private translator: TranslateService) {}

    ngOnInit(): void {}

    getMenuItemsForItem() {
        const items = [
            {
                label: this.translator.instant('share'),
                command: (event) => {
                    event.originalEvent.stopPropagation();
                    this.showModal(event);
                },
            },
            // {
            //     label: this.translator.instant('save_post'),
            //     command: (event) => {
            //         event.originalEvent.stopPropagation();
            //         this.showModal(event);
            //     },
            // },
        ];
        return [{ items }];
    }

    showModal(event) {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
