import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResizeableComponent } from '@base-components';
import { environment } from '@env/environment';
import { CoffeeLabService, ResizeService } from '@services';
import { takeUntil } from 'rxjs/operators';
import { CATEGORIES } from './category';

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
    constructor(protected resizeService: ResizeService, private coffeeLabService: CoffeeLabService) {
        super(resizeService);
    }

    ngOnInit(): void {
        console.log(this.categories);
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.categories = CATEGORIES[language];
            this.selectedLangCode = language;
            console.log(this.categories);
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
}
