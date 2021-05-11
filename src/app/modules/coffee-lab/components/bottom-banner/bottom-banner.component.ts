import { Component, OnInit, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

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

    constructor(@Inject(DOCUMENT) private doc) {}

    ngOnInit(): void {}

    handleScrolling() {
        const pos = this.doc.documentElement.scrollTop || this.doc.body.scrollTop;
        if (pos >= 600) {
            this.showBanner = true;
            window.scrollTo(0, 600);
        } else {
            this.showBanner = false;
        }
    }
}
