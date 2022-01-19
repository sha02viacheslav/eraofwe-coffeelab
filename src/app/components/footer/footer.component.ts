import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
    readonly env = environment;
    isExpand = true;
    language: string;
    pageOffsetHeight: number;
    constructor() {}

    @HostListener('window:scroll', ['$event'])
    scrollHandler(event) {
        this.pageOffsetHeight = window.pageYOffset;
    }

    ngOnInit(): void {}
}
