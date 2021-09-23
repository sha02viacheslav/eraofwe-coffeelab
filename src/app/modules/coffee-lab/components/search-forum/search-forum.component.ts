import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-search-forum',
    templateUrl: './search-forum.component.html',
    styleUrls: ['./search-forum.component.scss'],
})
export class SearchForumComponent implements OnInit {
    forumKeySearch: string;
    showDialog = false;

    constructor(public dialogSrv: DialogService, public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {}

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
