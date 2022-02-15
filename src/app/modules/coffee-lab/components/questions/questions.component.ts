import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any;
    @Input() totalRecords = 0;
    @Input() pages: number;
    @Input() rows: number;
    @Input() searchPage: boolean;
    constructor(private router: Router, private route: ActivatedRoute) {}

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

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.router.navigate([], { queryParams: { page: event.page + 1 }, queryParamsHandling: 'merge' });
        }
    }
}
