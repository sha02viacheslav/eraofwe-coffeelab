import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';
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
    showValidateMsg: boolean;
    showAgainMsg: boolean;
    constructor(private coffeLabService: CoffeeLabService, private cdr: ChangeDetectorRef) {}

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
                this.subscribeEmail = '';
                this.cdr.detectChanges();
            },
            (err) => {
                console.log(err);
            },
        );
    }
}
