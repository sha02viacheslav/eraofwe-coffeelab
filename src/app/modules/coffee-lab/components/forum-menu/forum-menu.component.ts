import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
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
                    this.showModal();
                },
            },
            {
                label: 'Save Post',
                command: () => {
                    this.showModal();
                },
            },
        ];
        return [{ items }];
    }

    showModal() {
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
