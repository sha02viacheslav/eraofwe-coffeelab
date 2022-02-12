import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { RouterMap, SlugMap } from '@constants';
import { PostType, RouterSlug } from '@enums';
import { SignupModalComponent } from '@modules/coffee-lab/components/signup-modal/signup-modal.component';
import { CoffeeLabService, ResizeService, StartupService } from '@services';
import { getLangRoute } from '@utils';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent extends ResizeableComponent implements OnInit {
    menuItems: MenuItem[] = [];
    postType: PostType;
    cuurentRoasterSlug: RouterSlug;
    isGlobalSearchResultPage = false;
    // isLoading: boolean;
    // keyword: string;
    // searchResult: any;
    // searchInput$: Subject<any> = new Subject<any>();
    constructor(
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private startupService: StartupService,
        protected resizeService: ResizeService,
        private dialogSrv: DialogService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.menuItems = this.getMenuItems(language);
            this.startupService.load(language);
            let currentRouter = this.router.url;
            if (currentRouter) {
                currentRouter = currentRouter.split('/')[2].split('?')[0];
            }
            const curRouterSlug = SlugMap[currentRouter] || RouterSlug.QA;
            const curRouterMap = RouterMap[language] || RouterMap.en;
            const destinationRouter = `/${getLangRoute(language)}/${curRouterMap[curRouterSlug]}`;
            if (this.router.url !== destinationRouter) {
                this.router.navigate([destinationRouter], { queryParamsHandling: 'merge' });
            }
            this.setPostType(curRouterSlug);
        });
    }

    setPostType(routerSlug: RouterSlug) {
        this.cuurentRoasterSlug = routerSlug;
        switch (routerSlug) {
            case RouterSlug.QA: {
                this.postType = PostType.QA;
                break;
            }
            case RouterSlug.ARTICLE: {
                this.postType = PostType.ARTICLE;
                break;
            }
            case RouterSlug.RECIPE: {
                this.postType = PostType.RECIPE;
                break;
            }
            case RouterSlug.EOW: {
                this.postType = PostType.ARTICLE;
                break;
            }
        }
    }

    getMenuItems(language) {
        const curRouterMap = RouterMap[language] || RouterMap.en;
        return [
            {
                label: 'question_answers',
                routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.QA]}`,
                command: () => this.setPostType(RouterSlug.QA),
            },
            {
                label: 'posts',
                routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.ARTICLE]}`,
                command: () => this.setPostType(RouterSlug.ARTICLE),
            },
            {
                label: 'brewing_guides',
                routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.RECIPE]}`,
                command: () => this.setPostType(RouterSlug.RECIPE),
            },
            {
                label: 'about_era_of_we',
                routerLink: `/${getLangRoute(language)}/${curRouterMap[RouterSlug.EOW]}`,
                command: () => this.setPostType(RouterSlug.EOW),
            },
        ];
    }

    onWrite() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
