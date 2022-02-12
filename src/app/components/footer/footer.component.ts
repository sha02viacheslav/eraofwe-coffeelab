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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';
import { validateEmail } from '@utils';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
    readonly env = environment;
    form: FormGroup;
    isExpand = true;
    language: string;
    pageOffsetHeight: number;
    isQAPage: boolean;
    showValidateMsg: boolean;
    showAgainMsg: boolean;
    showAd: boolean;
    constructor(
        private coffeLabService: CoffeeLabService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        public fb: FormBuilder,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.coffeLabService.showAd.subscribe((res) => {
            this.showAd = res;
        });
        this.form = this.fb.group({
            subscribeEmail: ['', [Validators.required, validateEmail.bind(this)]],
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
        if (this.form.valid) {
            this.coffeLabService.subscribeToMailList(this.form.value.subscribeEmail).subscribe(
                (res: any) => {
                    if (res.result && res.result === 'success') {
                        this.showValidateMsg = true;
                    } else {
                        this.showValidateMsg = true;
                        this.showAgainMsg = true;
                    }
                    this.form.reset();
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

    onCollapse(item) {
        if (item === 'collapse') {
            this.isExpand = false;
        }
    }

    onExpand(item) {
        if (item === 'expand') {
            this.isExpand = true;
        }
    }
}
