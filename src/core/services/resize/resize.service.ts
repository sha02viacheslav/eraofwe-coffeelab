import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ResizeService {
    private readonly tabletMinWidth = 768;
    private readonly desktopMinWidth = 992;

    isMobile$ = isPlatformBrowser(this.platformId) ? window.innerWidth < this.tabletMinWidth : true;
    isTablet$ = isPlatformBrowser(this.platformId)
        ? window.innerWidth < this.desktopMinWidth && window.innerWidth >= this.tabletMinWidth
        : false;
    isDesktop$ = isPlatformBrowser(this.platformId) ? window.innerWidth >= this.desktopMinWidth : false;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        if (isPlatformBrowser(this.platformId)) {
            this.onResize(window.innerWidth);
        }
    }

    isMobile(): boolean {
        return this.isMobile$;
    }

    isTablet(): boolean {
        return this.isTablet$;
    }

    isDesktop(): boolean {
        return this.isDesktop$;
    }

    onResize(width: number): void {
        this.isMobile$ = width < this.tabletMinWidth;
        this.isTablet$ = width < this.desktopMinWidth && width >= this.tabletMinWidth;
        this.isDesktop$ = width >= this.desktopMinWidth;
    }
}
