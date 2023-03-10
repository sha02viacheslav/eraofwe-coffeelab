import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    Input,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    form: FormGroup;
    isExpand = true;
    language: string;
    pageOffsetHeight: number;
    isQAPage: boolean;
    showValidateMsg: boolean;
    showAgainMsg: boolean;
    showAd: boolean;
    @Input() isLandingPage: boolean;
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
            subscribeMainEmail: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    ),
                ],
            ],
            subscribeSubEmail: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    ),
                ],
            ],
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

    onSubmit(type: string) {
        let email: string;
        if (type === 'main') {
            email = this.form.value.subscribeMainEmail;
        } else if (type === 'sub') {
            email = this.form.value.subscribeSubEmail;
        }
        this.coffeLabService.subscribeToMailList(email).subscribe(
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
            },
            (err) => {
                console.log(err);
            },
        );
    }

    onActionChange(item) {
        if (item === 'collapse') {
            this.isExpand = false;
        }
        if (item === 'expand') {
            this.isExpand = true;
        }
    }
}
