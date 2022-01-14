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

    shareData = [
        {
            heading: 'Create an account on Era of We',
            disp: 'You can contribute as an estate, roaster, barista, or coffee consumer',
            image: 'assets/images/group-29.svg',
        },
        {
            heading: 'Write in a language of your choosing',
            disp: 'We aim to be as inclusive as we can, so you can write in over 10 languages',
            image: 'assets/images/noun-languages-2711986.svg',
        },
        {
            heading: 'Tell your story- as a brand or coffee lover',
            disp:
                'Brands can promote their vision and share knowledge while consumers share their views and discover new brands.',
            image: 'assets/images/shape-2.svg',
        },
    ];
    hereData = [
        {
            name: 'Vasileia Fanarioti',
            position: 'The Wandering Bean',
            disp:
                'Cooking in the heart of Cajun country is an art form. There really is very little science to this particular form of cooking that includes a lot more than mere lagniappe from the pantry or the spice cabinet. Cajun cooking is something that has often been imitated around the country and around the world but can very rarely be accurately duplicated.',
            image: 'assets/images/rectangle.png',
        },
        {
            name: 'Anna Nordström',
            position: 'Anna Nordström',
            disp:
                'Cooking in the heart of Cajun country is an art form. There really is very little science to this particular form of cooking that includes a lot more than mere lagniappe from the pantry or the spice cabinet. Cajun cooking is something that has often been imitated around the country and around the world but can very rarely be accurately duplicated.',
            image: 'assets/images/rectangle-2.png',
        },
        {
            name: 'Yker Valerio',
            position: 'Bon Vivant Caffè',
            disp:
                'Cooking in the heart of Cajun country is an art form. There really is very little science to this particular form of cooking that includes a lot more than mere lagniappe from the pantry or the spice cabinet. Cajun cooking is something that has often been imitated around the country and around the world but can very rarely be accurately duplicated.',
            image: 'assets/images/rectangle-3.png',
        },
    ];

    platform = [
        {
            arrow: 'assets/images/arrow-down-circle-2.svg',
            heading: 'Coffee Bussinesses',
            disp:
                'Share your brand story directly with our audience. This platform gives you the space to build trust in your brand by sharing your expertise with consumers.',
        },
        {
            arrow: 'assets/images/arrow-down-circle-2.svg',
            heading: 'Consumers',
            disp:
                'Write about your coffee experiences, share your own articles and recipes, pose questions to experts and other consumers. It enables you to meet other coffee lovers from around the world',
        },
        {
            arrow: 'assets/images/arrow-down-circle.svg',
            heading: 'Proofreaders',
            disp:
                'Help make coffee more inclusive by translating and proofreading in 9 languages, with more languages being added soon.',
        },
    ];
    constructor() {}

    ngOnInit(): void {}
}
