import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'app-rectangle-ads',
    templateUrl: './rectangle-ads.component.html',
    styleUrls: ['./rectangle-ads.component.scss'],
})
export class RectangleAdsComponent implements OnInit {
    @Input() questionPage: boolean;
    readonly env = environment;
    constructor() {}

    ngOnInit(): void {}
}
