import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService } from '@services';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-rectangle-ads',
    templateUrl: './rectangle-ads.component.html',
    styleUrls: ['./rectangle-ads.component.scss'],
    providers: [MessageService],
})
export class RectangleAdsComponent implements OnInit {
    @Input() questionPage: boolean;
    readonly env = environment;
    subscribeEmail = '';
    constructor(
        private coffeLabService: CoffeeLabService,
        private messageService: MessageService,
        private translator: TranslateService,
    ) {}

    ngOnInit(): void {}

    onSubmit() {
        if (!this.subscribeEmail || !this.subscribeEmail.length) {
            this.messageService.add({
                key: 'myKey1',
                severity: 'error',
                summary: 'Please enter a valid email',
            });
            return;
        }

        this.coffeLabService.subscribeToMailList(this.subscribeEmail).subscribe(
            (res: any) => {
                if (res.result && res.result === 'success') {
                    this.messageService.add({
                        key: 'myKey1',
                        severity: 'success',
                        summary: this.translator.instant('thankyou_subscribing'),
                    });
                } else {
                    const summary = res.msg?.includes('already subscribed')
                        ? this.translator.instant('email_already_subscribed')
                        : this.translator.instant('common_error');
                    this.messageService.add({
                        key: 'myKey1',
                        severity: 'error',
                        summary,
                    });
                }
            },
            (err) => {
                console.log(err);
            },
        );
        this.subscribeEmail = '';
    }
}
