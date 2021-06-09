import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-forum-card',
    templateUrl: './forum-card.component.html',
    styleUrls: ['./forum-card.component.scss'],
})
export class ForumCardComponent implements OnInit {
    @Input() data: any;
    @Input() forumType: string;

    constructor(private router: Router, public dialogSrv: DialogService, private globalsService: GlobalsService) {}

    ngOnInit(): void {}

    onClick() {
        if (this.globalsService.getLimitCounter() > 0) {
            const language = this.data?.language || this.data?.lang_code;
            this.router.navigate([`${language}/${this.forumType ?? 'article'}/${this.data.slug}`]);
        } else {
            this.dialogSrv.open(SignupModalComponent, {
                data: {
                    isLimit: true,
                },
                showHeader: false,
                styleClass: 'signup-dialog',
            });
        }
    }
}
