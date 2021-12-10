import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-like-divider',
    templateUrl: './like-divider.component.html',
    styleUrls: ['./like-divider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikeDividerComponent implements OnInit {
    @Input() total: any;
    @Input() question: any;
    showJoinBtn = true;

    constructor(
        private activateRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        if (this.activateRoute.snapshot.params.idOrSlug) {
            this.showJoinBtn = false;
        }
    }

    getLink(item: any, answer: any) {
        const url = `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/qa-forum/${item.slug}`;
        return {
            url,
            queryParmas: {
                answer: answer?.id,
            },
        };
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }

    onJoin() {
        if (this.question) {
            this.router.navigate([this.getLink(this.question, this.question.answer).url], {
                queryParams: this.getLink(this.question, this.question.answer).queryParmas,
            });
        }
    }
}
