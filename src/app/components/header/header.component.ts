import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { environment } from '@env/environment';
import { CoffeeLabService, ResizeService } from '@services';
import { getLangRoute } from '@utils';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { HEADER_CATEGORIES } from './category';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends ResizeableComponent implements OnInit {
    readonly env = environment;
    categories: any[] = [];
    sideNavOpened: boolean;
    selectedLangCode: string;
    keyword: string;
    showTextBox: boolean;
    searchInput$: Subject<any> = new Subject<any>();

    constructor(
        protected resizeService: ResizeService,
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        super(resizeService);
        this.searchInput$.pipe(debounceTime(1000)).subscribe(() => {
            if (this.keyword) {
                this.router.navigate(['/en/qa-forum'], {
                    relativeTo: this.route,
                    queryParams: { search: this.keyword },
                    queryParamsHandling: 'merge',
                });
            }
        });
    }

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.categories = HEADER_CATEGORIES[language];
            this.selectedLangCode = getLangRoute(language);
        });
    }

    closeSideNav() {
        this.sideNavOpened = false;
    }

    openSideNav() {
        this.sideNavOpened = true;
    }

    onToggel(id) {
        const dropdown = document.getElementById(id);
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        } else {
            dropdown.style.display = 'block';
        }
    }

    handleSearch() {
        this.searchInput$.next(this.keyword);
    }
}
