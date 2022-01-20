import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'app-square-ads',
    templateUrl: './square-ads.component.html',
    styleUrls: ['./square-ads.component.scss'],
})
export class SquareAdsComponent implements OnInit {
    readonly env = environment;
    @Input() hideBorder: boolean;
    @Input() questionDetail: boolean;
    constructor() {}

    ngOnInit(): void {}
}
