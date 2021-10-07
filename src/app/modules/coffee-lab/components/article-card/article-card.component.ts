import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { getLangRoute } from '@utils';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
    @Input() article: any;

    constructor(private router: Router, private globalsService: GlobalsService, private dialogSrv: DialogService) {}

    ngOnInit(): void {}

    getLink(item) {
        return `/${getLangRoute(item.language)}/articles/${item.slug}`;
    }

    gotoDetailPage(event, item: any) {
        event.stopPropagation();
        event.preventDefault();
        if (this.globalsService.getLimitCounter() > 0) {
            this.router.navigate([this.getLink(item)]);
        } else {
            this.dialogSrv.open(SignupModalComponent, { data: { isLimit: true } });
        }
    }

    onFocus(event) {
        event.stopPropagation();
        event.preventDefault();
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
