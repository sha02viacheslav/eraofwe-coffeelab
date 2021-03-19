import { Component, OnInit } from '@angular/core';
import { DISCUSSIONS_FORUM } from './data';

@Component({
    selector: 'app-google-view',
    templateUrl: './google-view.component.html',
    styleUrls: ['./google-view.component.scss'],
})
export class GoogleViewComponent implements OnInit {
    forumKeySearch: string;
    data: any[] = DISCUSSIONS_FORUM;
    selectedData: any = DISCUSSIONS_FORUM[0];

    constructor() {}

    ngOnInit(): void {}
}
