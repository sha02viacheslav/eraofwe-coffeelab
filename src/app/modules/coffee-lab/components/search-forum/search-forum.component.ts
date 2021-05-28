import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
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
