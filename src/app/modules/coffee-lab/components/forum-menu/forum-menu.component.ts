import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { environment } from '@env/environment';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-forum-menu',
    templateUrl: './forum-menu.component.html',
    styleUrls: ['./forum-menu.component.scss'],
})
export class ForumMenuComponent implements OnInit {
    constructor(
        public dialogSrv: DialogService,
        @Inject(DOCUMENT) private document: Document,
        private globalsService: GlobalsService,
    ) {}

    ngOnInit(): void {}

    getMenuItemsForItem() {
        const items = [
            {
                label: this.globalsService.languageJson?.share,
                command: (event) => {
                    event.originalEvent.stopPropagation();
                    this.showModal(event);
                },
            },
            {
                label: this.globalsService.languageJson?.save_post,
                command: (event) => {
                    event.originalEvent.stopPropagation();
                    this.showModal(event);
                },
            },
        ];
        return [{ items }];
    }

    showModal(event) {
        this.dialogSrv
            .open(SignupModalComponent, {
                showHeader: false,
                styleClass: 'signup-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.document.location.href = `${environment.ssoWeb}/sign-up`;
                }
            });
    }
}
