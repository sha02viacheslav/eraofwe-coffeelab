import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { RouterMap, SlugMap } from '@constants';
import { RouterSlug } from '@enums';
import { CoffeeLabService, StartupService } from '@services';
import { getLangRoute } from '@utils';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-redirect-popup',
    templateUrl: './redirect-popup.component.html',
    styleUrls: ['./redirect-popup.component.scss'],
})
export class RedirectPopupComponent extends DestroyableComponent implements OnInit {
    data: any;
    isBrower: boolean;
    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        @Inject(DOCUMENT) private document: Document,
        private config: DynamicDialogConfig,
        private startupService: StartupService,
        private ref: DynamicDialogRef,
        private router: Router,
        private coffeeLabService: CoffeeLabService,
    ) {
        super();
        this.isBrower = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
        this.data = this.config?.data;
    }

    onCancel() {
        if (this.isBrower) {
            const date = new Date();
            date.setTime(date.getTime() + 15 * 60 * 1000);
            const expires = '; expires=' + date.toUTCString();
            this.document.cookie = 'langChange=set' + expires;
            this.ref.close();
        }
    }

    onApprove() {
        this.startupService.load(this.data.langCode);
        this.coffeeLabService.forumLanguage.next(this.data.langCode);
        let currentRouter = this.router.url;
        if (this.data.isDetailPage) {
            if (currentRouter) {
                const route =
                    getLangRoute(this.data.langCode) + '/' + currentRouter.split('/')[2] + '/' + this.data.slug;
                this.router.navigate([route]);
            }
        } else {
            if (currentRouter) {
                currentRouter = currentRouter.split('/')[2].split('?')[0];
            }
            const curRouterSlug = SlugMap[currentRouter] || RouterSlug.QA;
            const curRouterMap = RouterMap[this.data.langCode] || RouterMap.en;
            const destinationRouter = `/${getLangRoute(this.data.langCode)}/${curRouterMap[curRouterSlug]}`;
            if (this.router.url !== destinationRouter) {
                this.router.navigate([destinationRouter], { queryParamsHandling: 'merge' });
            }
        }
        this.ref.close();
    }
}
