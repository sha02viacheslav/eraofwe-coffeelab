import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
    readonly env = environment;
    isExpand = true;
    language: string;
    pageOffsetHeight: number;
    subscribeEmail: string;
    subscribeEmail2: string;
    isQAPage: boolean;
    showValidateMsg: boolean;
    showAgainMsg: boolean;
    showAd: boolean;
    constructor(
        private coffeLabService: CoffeeLabService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.coffeLabService.showAd.subscribe((res) => {
            this.showAd = res;
        });
    }

    @HostListener('window:scroll', ['$event'])
    scrollHandler(event) {
        this.isQAPage = this.router.url.includes('/qa-forum/');
        if (isPlatformBrowser(this.platformId)) {
            this.pageOffsetHeight = window.pageYOffset;
        }
    }

    ngOnInit(): void {}

    onSubmit() {
        const email = this.subscribeEmail || this.subscribeEmail2;
        if (email) {
            this.coffeLabService.subscribeToMailList(email).subscribe(
                (res: any) => {
                    if (res.result && res.result === 'success') {
                        this.showValidateMsg = true;
                    } else {
                        this.showValidateMsg = true;
                        this.showAgainMsg = true;
                    }
                    this.subscribeEmail = '';
                    this.subscribeEmail2 = '';
                    setTimeout(() => {
                        this.coffeLabService.showAd.next(false);
                        this.cdr.detectChanges();
                    }, 10000);
                    if (isPlatformBrowser(this.platformId)) {
                        window.localStorage.setItem('showAd', 'false');
                    }
                    this.cdr.detectChanges();
                },
                (err) => {
                    console.log(err);
                },
            );
        }
    }
}
