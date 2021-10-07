import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { PostType } from '@enums';
import { CoffeeLabService, GlobalsService, ResizeService } from '@services';
import { getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent extends ResizeableComponent implements OnInit {
    readonly PostType = PostType;
    @Input() questions: any[] = [];
    @Input() totalRecords = 0;
    pages = 1;
    rows = 10;
    constructor(
        private globalsService: GlobalsService,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private router: Router,
        private route: ActivatedRoute,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                this.pages = +params.get('page');
                if (this.pages < 1) {
                    this.pages = 1;
                }
            }
        });
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

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.router.navigate([], { queryParams: { page: event.page + 1 } });
        }
    }
}
