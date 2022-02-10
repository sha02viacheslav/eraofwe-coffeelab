import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-square-ads',
    templateUrl: './square-ads.component.html',
    styleUrls: ['./square-ads.component.scss'],
})
export class SquareAdsComponent implements OnInit {
    readonly env = environment;
    @Input() hideBorder: boolean;
    @Input() questionDetail: boolean;
    form: FormGroup;
    showValidateMsg: boolean;
    showAgainMsg: boolean;
    showAd: boolean;
    constructor(
        private coffeLabService: CoffeeLabService,
        private cdr: ChangeDetectorRef,
        public fb: FormBuilder,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.coffeLabService.showAd.subscribe((res) => {
            this.showAd = res;
        });
        this.form = this.fb.group({
            subscribeEmail: ['', Validators.compose([Validators.required, Validators.email])],
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        if (this.form.valid) {
            this.coffeLabService.subscribeToMailList(this.form.value.subscribeEmail).subscribe(
                (res: any) => {
                    if (res.result && res.result === 'success') {
                        this.showValidateMsg = true;
                    } else {
                        this.showValidateMsg = true;
                        this.showAgainMsg = true;
                    }
                    setTimeout(() => {
                        this.coffeLabService.showAd.next(false);
                        this.cdr.detectChanges();
                    }, 10000);
                    if (isPlatformBrowser(this.platformId)) {
                        window.localStorage.setItem('showAd', 'false');
                    }
                    this.form.value.subscribeEmail = '';
                    this.cdr.detectChanges();
                },
                (err) => {
                    console.log(err);
                },
            );
        }
    }
}
