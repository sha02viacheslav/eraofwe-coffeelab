import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-translate-toast',
    templateUrl: './translate-toast.component.html',
    styleUrls: ['./translate-toast.component.scss'],
})
export class TranslateToastComponent implements OnInit {
    @Input() language;

    constructor() {}

    ngOnInit(): void {}
}
