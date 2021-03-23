import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-forum-card',
    templateUrl: './forum-card.component.html',
    styleUrls: ['./forum-card.component.scss'],
})
export class ForumCardComponent implements OnInit {
    @Input() data: any;

    constructor() {}

    ngOnInit(): void {
        this.data = {
            title: 'Vegan White Chocolate',
            description: 'Cappuccino Fudge',
            authorAvatar: 'assets/images/user-sample.png',
            authorName: 'Ellyse Perry',
            date: '2 days ago',
            image: 'assets/images/recipe-bg-sample.png',
        };
    }
}
