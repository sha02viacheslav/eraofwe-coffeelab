import { Component, OnInit, HostListener } from '@angular/core';
import { DISCUSSIONS_FORUM } from './data';

@Component({
    selector: 'app-google-view',
    templateUrl: './google-view.component.html',
    styleUrls: ['./google-view.component.scss'],
})
export class GoogleViewComponent implements OnInit {
    forumKeySearch: string;
    data: any[] = DISCUSSIONS_FORUM;
    selectedData: any = DISCUSSIONS_FORUM[0];
    lastScrollTop = 0;
    showBanner = false;
    translateList: any[] = [
        {
            slug: 'coffee-spanish',
            avatarUrl: 'assets/images/user-sample.png',
            name: 'Gabriel Match',
            language: 'Spanish Translation',
            date: '5 days ago',
        },
        {
            slug: 'coffee-swedish',
            avatarUrl: 'assets/images/user-sample.png',
            name: 'Anthony Jones',
            language: 'Swedish Translation',
            date: '4 days ago',
        },
    ];

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const pos = document.documentElement.scrollTop || document.body.scrollTop;
        if (pos > this.lastScrollTop) {
            this.showBanner = true;
        } else {
            this.showBanner = false;
        }
        this.lastScrollTop = pos <= 0 ? 0 : pos;
    }

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

    onChangeTranslate(event) {
        console.log(event);
    }
}
