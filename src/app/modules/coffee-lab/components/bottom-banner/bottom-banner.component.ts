import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-bottom-banner',
    templateUrl: './bottom-banner.component.html',
    styleUrls: ['./bottom-banner.component.scss'],
})
export class BottomBannerComponent implements OnInit {
    showBanner = false;

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event) {
        event.preventDefault();
        const pos = document.documentElement.scrollTop || document.body.scrollTop;
        if (pos >= 300) {
            this.showBanner = true;
            setTimeout(() => {
                window.scrollTo(0, 300);
            }, 100);
        } else {
            this.showBanner = false;
        }
    }

    constructor() {}

    ngOnInit(): void {}
}
