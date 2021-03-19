import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss'],
})
export class BlankComponent implements OnInit {
    @Input() title = '';
    @Input() button = '';
    @Input() link = '';

    constructor() {}

    ngOnInit(): void {}
}
