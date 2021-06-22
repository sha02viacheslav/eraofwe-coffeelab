import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoffeeLabService, GlobalsService, StartupService } from '@services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { routerMap } from '@constants';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    menuItems = [
        {
            label: 'question_answers',
            routerLink: '/qa-forum',
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'posts',
            routerLink: '/articles',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'brewing_guides',
            routerLink: '/coffee-recipes',
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
    constructor(
        private coffeeLabService: CoffeeLabService,
        private globalsService: GlobalsService,
        private startupService: StartupService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            const lang = params.lang;
            this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
                this.menuItems = [
                    {
                        label: 'question_answers',
                        routerLink: `/${language}/${language === 'en' ? 'qa-forum' : routerMap.sv['qa-forum']}`,
                        icon: 'assets/images/qa-forum.svg',
                        activeIcon: 'assets/images/qa-forum-active.svg',
                    },
                    {
                        label: 'posts',
                        routerLink: `/${language}/${language === 'en' ? 'articles' : routerMap.sv['articles']}`,
                        icon: 'assets/images/article.svg',
                        activeIcon: 'assets/images/article-active.svg',
                    },
                    {
                        label: 'brewing_guides',
                        routerLink: `/${language}/${
                            language === 'en' ? 'coffee-recipes' : routerMap.sv['coffee-recipes']
                        }`,
                        icon: 'assets/images/coffee-recipe.svg',
                        activeIcon: 'assets/images/coffee-recipe-active.svg',
                    },
                    {
                        label: 'about_era_of_we',
                        routerLink: `/${language}/${
                            language === 'en' ? 'about-era-of-we' : routerMap.sv['about-era-of-we']
                        }`,
                        icon: 'assets/images/era-of-we.svg',
                        activeIcon: 'assets/images/era-of-we-active.svg',
                    },
                ];
                this.startupService.load(language);
                let currentRouter = this.globalsService.currentUrl;
                if (this.globalsService.currentUrl) {
                    currentRouter = this.globalsService.currentUrl.substr(4);
                }
                this.router.navigate([`/${language}/${routerMap[language][currentRouter]}`]);
            });
        });
    }
}
