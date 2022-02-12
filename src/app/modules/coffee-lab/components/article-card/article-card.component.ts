import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
    @Input() article: any;

    constructor(private router: Router, private dialogSrv: DialogService) {}

    ngOnInit(): void {}

    getLink(item) {
        return `/${getLangRoute(item?.language)}/articles/${item.slug}`;
    }

    gotoDetailPage(event, item: any) {
        event.stopPropagation();
        event.preventDefault();
        this.router.navigate([this.getLink(item)]);
    }

    onFocus(event) {
        event.stopPropagation();
        event.preventDefault();
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
