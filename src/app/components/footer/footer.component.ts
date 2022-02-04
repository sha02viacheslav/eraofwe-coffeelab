import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
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
    constructor(private coffeLabService: CoffeeLabService, private router: Router) {}

    @HostListener('window:scroll', ['$event'])
    scrollHandler(event) {
        this.isQAPage = this.router.url.includes('/qa-forum/');
        this.pageOffsetHeight = window.pageYOffset;
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
                },
                (err) => {
                    console.log(err);
                },
            );
        }
    }
}
