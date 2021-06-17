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
    detailsUrl: any;

    constructor(private router: Router, public dialogSrv: DialogService, private globalsService: GlobalsService) {}

    ngOnInit(): void {
        const language = this.data?.language || this.data?.lang_code;
        this.detailsUrl = `/${language}/${this.forumType ?? 'article'}/${this.data.slug}`;
    }

    onClick(event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.globalsService.getLimitCounter() > 0) {
            this.router.navigate([this.detailsUrl]);
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
