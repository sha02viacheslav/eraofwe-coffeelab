import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { PostType } from '@enums';
import { CoffeeLabService, ResizeService } from '@services';
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
    @Input() searchPage: boolean;
    showAd: boolean;
    constructor(
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private router: Router,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.coffeeLabService.showAd.subscribe((res) => {
            this.showAd = res;
        });
    }

    ngOnInit(): void {}

    getLink(item: any) {
        return `/${getLangRoute(this.coffeeLabService.currentForumLanguage)}/qa-forum/${item?.slug}`;
    }

    gotoDetailPage(event: any, item: any) {
        event.stopPropagation();
        event.preventDefault();
        this.router.navigate([this.getLink(item)]);
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
