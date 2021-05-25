import { Component, OnInit } from '@angular/core';
import { DISCUSSIONS_FORUM } from '../data';

@Component({
    selector: 'app-era-of-we',
    templateUrl: './era-of-we.component.html',
    styleUrls: ['./era-of-we.component.scss'],
})
export class EraOfWeComponent implements OnInit {
    data: any[] = DISCUSSIONS_FORUM;
    constructor() {}

    ngOnInit(): void {}
}
