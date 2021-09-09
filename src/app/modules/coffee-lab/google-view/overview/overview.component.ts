import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoffeeLabService, GlobalsService, StartupService } from '@services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RouterMap, SlugMap } from '@constants';
import { MenuItem } from 'primeng/api';
import { RouterSlug } from '@enums';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    menuItems: MenuItem[] = [];
    constructor(
        private coffeeLabService: CoffeeLabService,
        private globalsService: GlobalsService,
        private startupService: StartupService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
                this.menuItems = this.getMenuItems(language);
                this.startupService.load(language);
                let currentRouter = this.globalsService.currentUrl;
                if (this.globalsService.currentUrl) {
                    currentRouter = this.globalsService.currentUrl.split('/')[2].split('?')[0];
                }
                this.router.navigate(
                    [`/${getLangRoute(language)}/${RouterMap[language][SlugMap[currentRouter] || RouterSlug.QA]}`],
                    {
                        queryParamsHandling: 'merge',
                    },
                );
            });
        });
    }

    getMenuItems(language) {
        return [
            {
                label: 'question_answers',
                routerLink: `/${getLangRoute(language)}/${RouterMap[language][RouterSlug.QA]}`,
                icon: 'assets/images/qa-forum.svg',
                activeIcon: 'assets/images/qa-forum-active.svg',
            },
            {
                label: 'posts',
                routerLink: `/${getLangRoute(language)}/${RouterMap[language][RouterSlug.ARTICLE]}`,
                icon: 'assets/images/article.svg',
                activeIcon: 'assets/images/article-active.svg',
            },
            {
                label: 'brewing_guides',
                routerLink: `/${getLangRoute(language)}/${RouterMap[language][RouterSlug.RECIPE]}`,
                icon: 'assets/images/coffee-recipe.svg',
                activeIcon: 'assets/images/coffee-recipe-active.svg',
            },
            {
                label: 'about_era_of_we',
                routerLink: `/${getLangRoute(language)}/${RouterMap[language][RouterSlug.EOW]}`,
                icon: 'assets/images/era-of-we.svg',
                activeIcon: 'assets/images/era-of-we-active.svg',
            },
        ];
    }
}
