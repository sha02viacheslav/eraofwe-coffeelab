import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-translate-toast',
    templateUrl: './translate-toast.component.html',
    styleUrls: ['./translate-toast.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateToastComponent implements OnInit {
    @Input() language;

    constructor() {}

    ngOnInit(): void {}
}
