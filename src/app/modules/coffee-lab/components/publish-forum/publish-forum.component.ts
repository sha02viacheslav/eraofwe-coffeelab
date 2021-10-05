import { Component, OnInit, Input } from '@angular/core';
import { PostType } from '@enums';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-publish-forum',
    templateUrl: './publish-forum.component.html',
    styleUrls: ['./publish-forum.component.scss'],
})
export class PublishForumComponent implements OnInit {
    @Input() type = PostType.QA;
    btnValues = {
        [PostType.ARTICLE]: {
            firstBtnValue: 'ask_a_question',
            secondBtnValue: 'create_brew_guide',
            placeHolderValue: 'write_post',
        },
        [PostType.RECIPE]: {
            firstBtnValue: 'ask_a_question',
            secondBtnValue: 'write_post',
            placeHolderValue: 'create_brew_guide',
        },
        [PostType.QA]: {
            firstBtnValue: 'write_post',
            secondBtnValue: 'create_brew_guide',
            placeHolderValue: 'ask_your_question',
        },
    };
    constructor(public dialogSrv: DialogService) {}

    ngOnInit(): void {}

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
