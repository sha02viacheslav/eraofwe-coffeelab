import { Component, OnInit, Inject, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DOCUMENT } from '@angular/common';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { environment } from '@env/environment';

@Component({
    selector: 'app-publish-forum',
    templateUrl: './publish-forum.component.html',
    styleUrls: ['./publish-forum.component.scss'],
})
export class PublishForumComponent implements OnInit {
    @Input() type: string;
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
