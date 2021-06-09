import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CoffeeLabService, GlobalsService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { environment } from '@env/environment';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
    @Input() questions: any[] = [];
    @Input() viewMode = 'list';
    @Input() forumLanguage;
    questionMenuItems: MenuItem[] = [];
    totalRecords = 0;
    displayData: any[] = [];
    jsonLD: any;

    constructor(
        private router: Router,
        public coffeeLabService: CoffeeLabService,
        public dialogSrv: DialogService,
        private globalsService: GlobalsService,
    ) {}

    ngOnInit(): void {
        this.displayData = this.questions.slice(0, 10);
        this.totalRecords = this.questions.length;
        // this.setSchemaMackup();
    }

    paginate(event: any) {
        this.displayData = this.questions.slice(event.first, event.first + event.rows);
        // this.setSchemaMackup();
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

    ngOnDestroy(): void {
        this.jsonLD = null;
    }

    setSchemaMackup() {
        const forumList: any[] = [];
        for (const forum of this.displayData) {
            const itemData = {
                '@type': 'QAPage',
                mainEntity: {
                    '@type': 'Question',
                    name: forum.slug,
                    text: forum.question,
                    answerCount: forum.answers?.length || 0,
                    dateCreated: forum.created_at,
                    author: {
                        '@type': 'Person',
                        name: forum.question_user,
                    },
                    suggestedAnswer: forum.answers?.map((answer, index) => {
                        return {
                            '@type': 'Answer',
                            text: this.globalsService.getJustText(answer.answer),
                            dateCreated: answer.created_at,
                            url: `${environment.coffeeLabWeb}/${this.forumLanguage}/qa/${forum.slug}?#answer-${answer.id}`,
                            author: {
                                '@type': 'Person',
                                name: answer.user_name,
                            },
                        };
                    }),
                },
            };
            forumList.push(itemData);
        }
        this.jsonLD = {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            name: 'Overview',
                            item: `${environment.coffeeLabWeb}/${this.forumLanguage}/overview`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Q+A Forums',
                        },
                    ],
                },
                ...forumList,
            ],
        };
    }
}
