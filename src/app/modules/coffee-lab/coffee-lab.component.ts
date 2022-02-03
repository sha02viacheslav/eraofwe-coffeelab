import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { protectPassword } from '@constants';
import { environment } from '@env/environment';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-coffee-lab',
    templateUrl: './coffee-lab.component.html',
    styleUrls: ['./coffee-lab.component.scss'],
})
export class CoffeeLabComponent extends DestroyableComponent implements OnInit, AfterViewInit {
    readonly env = environment;
    isMatched = !environment.needProtect;
    showAll = true;
    sideNavOpened: boolean;
    showSearch: any;
    searchString: any;
    searchResults: any;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.showAll = false;
        }
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            const scrollEvent = fromEvent(window, 'scroll')
                .pipe(debounceTime(100))
                .pipe(takeUntil(this.unsubscribeAll$))
                .subscribe((res) => {
                    if (window.scrollY > 10) {
                        scrollEvent.unsubscribe();
                        this.showAll = true;
                    }
                });
        }
    }

    onCheckPassword(password: string) {
        this.isMatched = password === protectPassword || !environment.needProtect;
    }

    closeSideNav() {
        this.sideNavOpened = false;
        setTimeout(() => {
            // this.menuService.isMenuOpened.next(this.sideNavOpened);
        }, 800);
    }

    openSideNav() {
        this.sideNavOpened = true;
        // this.menuService.isMenuOpened.next(this.sideNavOpened);
    }

    openSearchPanel() {
        if (!this.showSearch) {
            this.showSearch = true;
            window.scrollTo(0, 0);
        }
    }

    closeSearchPanel() {
        this.searchString = null;
        this.searchResults = null;
        this.showSearch = false;
        window.scrollTo(0, 0);
    }
}
