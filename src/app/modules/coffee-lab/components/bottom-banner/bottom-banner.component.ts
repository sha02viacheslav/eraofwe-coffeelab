import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-bottom-banner',
    templateUrl: './bottom-banner.component.html',
    styleUrls: ['./bottom-banner.component.scss'],
})
export class BottomBannerComponent implements OnInit {
    lastScrollTop = 0;
    showBanner = false;

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const pos = document.documentElement.scrollTop || document.body.scrollTop;
        if (pos > this.lastScrollTop) {
            this.showBanner = true;
        } else {
            this.showBanner = false;
        }
        this.lastScrollTop = pos <= 0 ? 0 : pos;
    }

    constructor() {}

    ngOnInit(): void {}
}
