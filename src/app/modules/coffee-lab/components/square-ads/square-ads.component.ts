import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-square-ads',
    templateUrl: './square-ads.component.html',
    styleUrls: ['./square-ads.component.scss'],
})
export class SquareAdsComponent implements OnInit {
    @Input() hideBorder: boolean;
    constructor() {}

    ngOnInit(): void {}
}
