import { Component, OnInit } from '@angular/core';
import { DISCUSSIONS_FORUM } from '../data';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements OnInit {
    forumKeySearch: string;
    data: any[] = DISCUSSIONS_FORUM;
    selectedData: any = DISCUSSIONS_FORUM[0];
    infoData: any[] = [
        {
            icon: 'assets/images/expertise-level.svg',
            label: 'Expertise level',
            value: 'Beginner',
        },
        {
            icon: 'assets/images/preparation-time.svg',
            label: 'Preparation Time',
            value: '15 mins',
        },
        {
            icon: 'assets/images/cooking-time.svg',
            label: 'Cooking Time',
            value: '35 mins',
        },
        {
            icon: 'assets/images/servings.svg',
            label: 'Serving',
            value: '2-3',
        },
    ];

    constructor() {}

    ngOnInit(): void {}

    getMenuItemsForItem(item) {
        const items = [
            {
                label: 'Share',
                command: () => {
                    this.onShare(item);
                },
            },
            {
                label: 'Save Post',
                command: () => {
                    this.onSavePost(item);
                },
            },
            {
                label: 'Translate answer',
                command: () => {
                    this.onTranslate(item);
                },
            },
        ];
        return [{ items }];
    }

    onShare(postItem) {}
    onSavePost(postItem) {}
    onTranslate(postItem) {}
}
