import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-bottom-banner',
    templateUrl: './bottom-banner.component.html',
    styleUrls: ['./bottom-banner.component.scss'],
})
export class BottomBannerComponent implements OnInit {
    lastScrollTop = 0;
    showBanner = false;
    isDouble = false;

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event) {
        event.preventDefault();
        const pos = document.documentElement.scrollTop || document.body.scrollTop;
        if (pos > this.lastScrollTop) {
            if (this.showBanner && !this.isDouble) {
                setTimeout(() => {
                    this.isDouble = true;
                    window.scrollTo(0, 1);
                }, 500);
            } else {
                this.showBanner = true;
                this.isDouble = false;
            }
        } else {
            if (!this.isDouble || pos === 0) {
                this.showBanner = false;
            }
        }
        this.lastScrollTop = pos <= 0 ? 0 : pos;
    }

    constructor() {}

    ngOnInit(): void {}
}
