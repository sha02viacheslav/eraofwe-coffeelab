import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoffeeLabService, GlobalsService, StartupService } from '@services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { routerMap } from '@constants';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    menuItems: MenuItem[];
    constructor(
        private coffeeLabService: CoffeeLabService,
        private globalsService: GlobalsService,
        private startupService: StartupService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.menuItems = this.getMenuItems('en');
        this.activatedRoute.params.subscribe((params) => {
            let lang;
            if (window.location.href?.includes('/en/')) {
                lang = 'en';
            } else if (window.location.href?.includes('/sv/')) {
                lang = 'sv';
            }

            if (lang) {
                this.coffeeLabService.forumLanguage.next(lang);
            }

            this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
                this.menuItems = this.getMenuItems(language);
                this.startupService.load(language);
                let currentRouter = this.globalsService.currentUrl;
                if (this.globalsService.currentUrl) {
                    currentRouter = this.globalsService.currentUrl.split('/')[2].split('?')[0];
                }
                this.router.navigate([`/${language}/${routerMap[language][currentRouter]}`], {
                    queryParamsHandling: 'merge',
                });
            });
        });
    }

    getMenuItems(language) {
        return [
            {
                label: 'question_answers',
                routerLink: `/${language}/${routerMap[language]['qa-forum']}`,
                icon: 'assets/images/qa-forum.svg',
                activeIcon: 'assets/images/qa-forum-active.svg',
            },
            {
                label: 'posts',
                routerLink: `/${language}/${routerMap[language]['articles']}`,
                icon: 'assets/images/article.svg',
                activeIcon: 'assets/images/article-active.svg',
            },
            {
                label: 'brewing_guides',
                routerLink: `/${language}/${routerMap[language]['coffee-recipes']}`,
                icon: 'assets/images/coffee-recipe.svg',
                activeIcon: 'assets/images/coffee-recipe-active.svg',
            },
            {
                label: 'about_era_of_we',
                routerLink: `/${language}/${routerMap[language]['about-era-of-we']}`,
                icon: 'assets/images/era-of-we.svg',
                activeIcon: 'assets/images/era-of-we-active.svg',
            },
        ];
    }
}
