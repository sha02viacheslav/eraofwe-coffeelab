import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    readonly env = environment;
    sideNavOpened: boolean;
    constructor() {}

    ngOnInit(): void {}

    closeSideNav() {
        this.sideNavOpened = false;
    }

    openSideNav() {
        this.sideNavOpened = true;
    }

    open() {
        const dropdown = document.getElementsByClassName('dropbtn');
        let i;
        for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener('click', (item: any) => {
                item?.classList?.toggle('active');
                const dropdownContent = item?.nextElementSibling;
                if (dropdownContent) {
                    if (dropdownContent.style.display === 'block') {
                        dropdownContent.style.display = 'none';
                    } else {
                        dropdownContent.style.display = 'block';
                    }
                }
            });
        }
    }
}
