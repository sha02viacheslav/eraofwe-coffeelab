import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GlobalsService } from '@services';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-coffee-lab',
    templateUrl: './coffee-lab.component.html',
    styleUrls: ['./coffee-lab.component.scss'],
    providers: [TitleCasePipe],
})
export class CoffeeLabComponent implements OnInit {
    menuItems = [
        {
            label: 'qa_forum',
            routerLink: '/qa',
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'articles',
            routerLink: '/article',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'coffee_recipes',
            routerLink: '/recipe',
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
        {
            label: 'about_era_of_we',
            routerLink: '/about-era-of-we',
            icon: 'assets/images/era-of-we.svg',
            activeIcon: 'assets/images/era-of-we-active.svg',
        },
    ];
    constructor() {}

    ngOnInit(): void {}
}
