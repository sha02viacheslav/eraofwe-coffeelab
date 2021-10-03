import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-publish-forum',
    templateUrl: './publish-forum.component.html',
    styleUrls: ['./publish-forum.component.scss'],
})
export class PublishForumComponent implements OnInit {
    @Input() type: string;
    firstBtnValue: string;
    secondBtnValue: string;
    placeHolderValue: string;
    constructor(public dialogSrv: DialogService) {}

    ngOnInit(): void {
        if (this.type === 'article') {
            this.firstBtnValue = 'ask_a_question';
            this.secondBtnValue = 'create_brew_guide';
            this.placeHolderValue = 'write_post';
        } else if (this.type === 'recipe') {
            this.firstBtnValue = 'ask_a_question';
            this.secondBtnValue = 'write_post';
            this.placeHolderValue = 'create_brew_guide';
        } else {
            this.firstBtnValue = 'write_post';
            this.secondBtnValue = 'create_brew_guide';
            this.placeHolderValue = 'ask_your_question';
        }
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
