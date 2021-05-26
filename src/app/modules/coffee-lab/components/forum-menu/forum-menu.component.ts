import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-forum-menu',
    templateUrl: './forum-menu.component.html',
    styleUrls: ['./forum-menu.component.scss'],
})
export class ForumMenuComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    getMenuItemsForItem(item) {
        const items = [
            {
                label: 'Share',
                command: () => {
                    this.showModal();
                },
            },
            {
                label: 'Save Post',
                command: () => {
                    this.showModal();
                },
            },
            {
                label: 'Translate answer',
                command: () => {
                    this.showModal();
                },
            },
        ];
        return [{ items }];
    }

    showModal() {}
}
