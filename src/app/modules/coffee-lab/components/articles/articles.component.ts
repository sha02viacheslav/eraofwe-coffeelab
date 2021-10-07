import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '@services';
import { getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
    @Input() articles: any[] = [];
    @Input() isEraofWe = false;
    @Input() totalRecords = 0;
    page = 1;
    rows = 10;
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('page')) {
                this.page = +params.get('page');
                if (this.page < 1) {
                    this.page = 1;
                }
            }
        });
    }

    paginate(event: any) {
        if (this.page !== event.page + 1) {
            this.router.navigate([], { queryParams: { page: event.page + 1 } });
        }
    }
}
