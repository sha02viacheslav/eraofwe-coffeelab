import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-like-divider',
    templateUrl: './like-divider.component.html',
    styleUrls: ['./like-divider.component.scss'],
})
export class LikeDividerComponent implements OnInit {
    @Input() total: any;
    @Input() question: any;
    buttonList = [{ button: 'Roasting' }, { button: 'Coffee grinding' }, { button: 'Milling' }, { button: 'Brewing' }];
    showJoinBtn = true;

    constructor(
        public dialogSrv: DialogService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
    ) {}

    ngOnInit(): void {
        if (this.activateRoute.snapshot.params.idOrSlug) {
            this.showJoinBtn = false;
        }
    }

    getLink(item: any, answer: any) {
        const url = `/${this.coffeeLabService.currentForumLanguage}/qa-forum/${item.slug}`;
        return {
            url,
            queryParmas: {
                answer: answer?.id,
            },
        };
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {
            showHeader: false,
            styleClass: 'signup-dialog',
        });
    }

    onJoin() {
        if (this.question) {
            this.router.navigate([this.getLink(this.question, this.question.answer).url], {
                queryParams: this.getLink(this.question, this.question.answer).queryParmas,
            });
        }
    }
}
