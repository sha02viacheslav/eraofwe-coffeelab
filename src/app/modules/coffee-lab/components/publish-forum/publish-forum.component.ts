import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostType } from '@enums';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-publish-forum',
    templateUrl: './publish-forum.component.html',
    styleUrls: ['./publish-forum.component.scss'],
})
export class PublishForumComponent implements OnInit {
    readonly Postype = PostType;
    @Input() type = PostType.QA;
    btnValues = {
        [PostType.ARTICLE]: {
            placeHolderValue: 'write_post',
        },
        [PostType.RECIPE]: {
            placeHolderValue: 'create_brew_guide',
        },
        [PostType.QA]: {
            placeHolderValue: 'ask_a_question',
        },
    };
    hideContent: boolean;
    constructor(public dialogSrv: DialogService, private route: ActivatedRoute) {
        this.route.queryParamMap.subscribe((params) => {
            this.hideContent = params.has('search') ? true : false;
        });
    }

    ngOnInit(): void {}
    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
