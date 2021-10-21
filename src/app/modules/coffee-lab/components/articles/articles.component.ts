import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { GlobalsService, ResizeService } from '@services';
import { getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent extends ResizeableComponent implements OnInit {
    @Input() articles: any[] = [];
    @Input() isEraofWe = false;
    @Input() totalRecords = 0;
    @Input() pages: number;
    @Input() rows: number;
    constructor(private route: ActivatedRoute, private router: Router, protected resizeService: ResizeService) {
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

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.router.navigate([], { queryParams: { page: event.page + 1 } });
        }
    }
}
