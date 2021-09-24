import { Component, OnInit, Input } from '@angular/core';
import { CoffeeLabService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from '@base-components';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-publish-forum',
    templateUrl: './publish-forum.component.html',
    styleUrls: ['./publish-forum.component.scss'],
})
export class PublishForumComponent extends DestroyableComponent implements OnInit {
    @Input() type: string;
    firstBtnValue: string;
    secondBtnValue: string;
    placeHolderValue: string;
    constructor(
        public dialogSrv: DialogService,
        private coffeeLabService: CoffeeLabService,
        private translator: TranslateService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.coffeeLabService.gotTranslations.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            if (this.type === 'article') {
                this.firstBtnValue = this.translator.instant('ask_a_question');
                this.secondBtnValue = this.translator.instant('create_brew_guide');
                this.placeHolderValue = this.translator.instant('write_post');
            } else if (this.type === 'recipe') {
                this.firstBtnValue = this.translator.instant('ask_a_question');
                this.secondBtnValue = this.translator.instant('write_post');
                this.placeHolderValue = this.translator.instant('create_brew_guide');
            } else {
                this.firstBtnValue = this.translator.instant('write_post');
                this.secondBtnValue = this.translator.instant('create_brew_guide');
                this.placeHolderValue = this.translator.instant('ask_your_question');
            }
        });
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
