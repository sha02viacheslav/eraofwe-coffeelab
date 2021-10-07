import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { getLangRoute } from '@utils';
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

    constructor(private router: Router, private dialogSrv: DialogService, private globalsService: GlobalsService) {}

    ngOnInit(): void {}

    getLink(item) {
        const url = `/${getLangRoute(item.lang_code)}/coffee-recipes/${item.slug}`;
        return url;
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
