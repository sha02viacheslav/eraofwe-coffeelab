import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';
import { environment } from '@env/environment';

@Component({
    selector: 'app-search-forum',
    templateUrl: './search-forum.component.html',
    styleUrls: ['./search-forum.component.scss'],
})
export class SearchForumComponent implements OnInit {
    forumKeySearch: string;
    showDialog = false;

    constructor(public dialogSrv: DialogService, @Inject(DOCUMENT) private document: Document) {}

    ngOnInit(): void {}

    onFocus() {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Confirm',
                    desp: 'Sign Up to continue reading',
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
