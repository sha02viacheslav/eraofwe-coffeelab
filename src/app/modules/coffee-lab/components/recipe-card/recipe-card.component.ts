import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-recipe-card',
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
    @Input() recipe: any;
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    isSaveBtn = false;

    constructor(private router: Router, private dialogSrv: DialogService) {}

    ngOnInit(): void {}

    getLink(item) {
        return `/${getLangRoute(item?.lang_code)}/coffee-recipes/${item.slug}`;
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
