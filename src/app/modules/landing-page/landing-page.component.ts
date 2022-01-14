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

    platform = [
        {
            heading: 'Coffee Bussinesses',
            disp:
                'Share your brand story directly with our audience. This platform gives you the space to build trust in your brand by sharing your expertise with consumers.',
        },
        {
            heading: 'Consumers',
            disp:
                'Share your brand story directly with our audience. This platform gives you the space to build trust in your brand by sharing your expertise with consumers.',
        },
        {
            heading: 'Proofreaders',
            disp:
                'Help make coffee more inclusive by translating and proofreading in 9 languages, with more languages being added soon.',
        },
    ];
    constructor() {}

    ngOnInit(): void {}
}
