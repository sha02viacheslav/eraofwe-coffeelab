import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';
import { environment } from '@env/environment';

@Component({
    selector: 'app-forum-menu',
    templateUrl: './forum-menu.component.html',
    styleUrls: ['./forum-menu.component.scss'],
})
export class ForumMenuComponent implements OnInit {
    constructor(public dialogSrv: DialogService, @Inject(DOCUMENT) private document: Document) {}

    ngOnInit(): void {}

    getMenuItemsForItem() {
        const items = [
            {
                label: 'Share',
                command: () => {
                    this.showModal('share');
                },
            },
            {
                label: 'Save Post',
                command: () => {
                    this.showModal('save post');
                },
            },
            {
                label: 'Translate answer',
                command: () => {
                    this.showModal('translate answer');
                },
            },
        ];
        return [{ items }];
    }

    showModal(functionality: any) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Confirm',
                    desp: `Sign Up to ${functionality}`,
                    type: 'confirm',
                    noButton: 'Cancel',
                    yesButton: 'Yes, Sign Up',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.document.location.href = `${environment.ssoWeb}/sign-up`;
                }
            });
    }
}
