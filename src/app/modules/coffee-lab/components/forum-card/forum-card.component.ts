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
}
