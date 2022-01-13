import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
    trending = [
        { title: 'Article', heading: 'Delonghi Magnifica Review', image: 'assets/images/unsplash.png' },
        { title: 'recipe', heading: 'Java Chip Frappuccino Starbucks', image: 'assets/images/unsplash.png' },
        {
            title: 'Article',
            heading: 'Does Ground Coffee Lose Caffeine Over Time?',
            image: 'assets/images/unsplash.png',
        },
    ];
    constructor() {}

    ngOnInit(): void {}
}
