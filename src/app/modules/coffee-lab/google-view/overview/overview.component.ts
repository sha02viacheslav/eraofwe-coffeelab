import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    menuItems = [
        {
            label: 'question_answers',
            routerLink: '/overview/qa-forum',
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'posts',
            routerLink: '/overview/articles',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'coffee_recipes',
            routerLink: '/overview/coffee-recipes',
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
        {
            label: 'about_era_of_we',
            routerLink: '/overview/about-era-of-we',
            icon: 'assets/images/era-of-we.svg',
            activeIcon: 'assets/images/era-of-we-active.svg',
        },
    ];
    constructor() {}

    ngOnInit(): void {}
}
