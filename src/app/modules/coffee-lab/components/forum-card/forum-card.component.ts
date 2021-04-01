import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-forum-card',
    templateUrl: './forum-card.component.html',
    styleUrls: ['./forum-card.component.scss'],
})
export class ForumCardComponent implements OnInit {
    @Input() data: any;
    @Input() forumType: string;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    onClick() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                slug: this.data.slug,
            },
        };
        this.router.navigate([`/coffee-lab/${this.forumType ?? 'article'}`], navigationExtras);
    }

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
        ];
        return [{ items }];
    }

    onShare(postItem) {}
    onSavePost(postItem) {}
}
