import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { PostType } from '@enums';
import { CoffeeLabService, GlobalsService, ResizeService } from '@services';
import { getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-question-card',
    templateUrl: './question-card.component.html',
    styleUrls: ['./question-card.component.scss'],
})
export class QuestionsCardComponent extends ResizeableComponent implements OnInit {
    readonly PostType = PostType;
    @Input() question: any;
    @Input() pages = 1;
    @Input() index: number;
    constructor(
        private globalsService: GlobalsService,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private router: Router,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {}

    getLink(item: any, answer: any) {
        const url = `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/qa-forum/${item.slug}`;
        return {
            url,
            queryParmas: {
                answer: answer?.id,
            },
        };
    }

    gotoDetailPage(event, item: any, answer?: any) {
        event.stopPropagation();
        event.preventDefault();
        if (this.globalsService.getLimitCounter() > 0) {
            this.router.navigate([this.getLink(item, answer).url], {
                queryParams: this.getLink(item, answer).queryParmas,
            });
        } else {
            this.dialogSrv.open(SignupModalComponent, { data: { isLimit: true } });
        }
    }
}
