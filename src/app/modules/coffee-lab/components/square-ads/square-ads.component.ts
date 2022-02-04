import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-square-ads',
    templateUrl: './square-ads.component.html',
    styleUrls: ['./square-ads.component.scss'],
    providers: [MessageService],
})
export class SquareAdsComponent implements OnInit {
    readonly env = environment;
    @Input() hideBorder: boolean;
    @Input() questionDetail: boolean;
    subscribeEmail: string;
    showValidateMsg: boolean;
    showAgainMsg: boolean;
    showAd: boolean;
    constructor(
        private coffeLabService: CoffeeLabService,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.coffeLabService.showAd.subscribe((res) => {
            this.showAd = res;
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        this.coffeLabService.subscribeToMailList(this.subscribeEmail).subscribe(
            (res: any) => {
                if (res.result && res.result === 'success') {
                    this.showValidateMsg = true;
                } else {
                    this.showValidateMsg = true;
                    this.showAgainMsg = true;
                }
                setTimeout(() => {
                    this.coffeLabService.showAd.next(false);
                }, 10000);
                if (isPlatformBrowser(this.platformId)) {
                    window.localStorage.setItem('showAd', 'false');
                }
                this.subscribeEmail = '';
                this.cdr.detectChanges();
            },
            (err) => {
                console.log(err);
            },
        );
    }
}
