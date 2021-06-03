import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CoffeeLabService, GlobalsService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any[] = [];
    @Input() viewMode = 'list';
    questionMenuItems: MenuItem[] = [];
    totalRecords = 0;
    displayData: any[] = [];

    constructor(
        private router: Router,
        public coffeeLabService: CoffeeLabService,
        public dialogSrv: DialogService,
        private globalsService: GlobalsService,
    ) {}

    ngOnInit(): void {
        this.displayData = this.questions.slice(0, 10);
        this.totalRecords = this.questions.length;
    }

    paginate(event: any) {
        this.displayData = this.questions.slice(event.first, event.first + event.rows);
    }

    getLink(item: any, answer: any) {
        const url = `${this.coffeeLabService.currentForumLanguage}/qa/${item.slug}`;
        return {
            url,
            queryParmas: {
                answer: answer?.id,
            },
        };
    }

    gotoDetailPage(item: any, answer?: any) {
        if (this.globalsService.getLimitCounter() > 0) {
            this.router.navigate([this.getLink(item, answer).url], {
                queryParams: this.getLink(item, answer).queryParmas,
            });
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
