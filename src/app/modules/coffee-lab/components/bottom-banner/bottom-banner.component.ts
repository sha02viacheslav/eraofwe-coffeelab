import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-bottom-banner',
    templateUrl: './bottom-banner.component.html',
    styleUrls: ['./bottom-banner.component.scss'],
})
export class BottomBannerComponent implements OnInit {
    showBanner = false;
    ticking = false;

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const self = this;
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                self.handleScrolling();
                self.ticking = false;
            });
        }

        this.ticking = true;
    }

    constructor() {}

    ngOnInit(): void {}

    handleScrolling() {
        const pos = document.documentElement.scrollTop || document.body.scrollTop;
        if (pos >= 300) {
            this.showBanner = true;
            window.scrollTo(0, 300);
        } else {
            this.showBanner = false;
        }
    }
}
