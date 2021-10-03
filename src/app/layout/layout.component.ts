import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { protectPassword } from '@constants';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    readonly env = environment;
    isMatched = !environment.needProtect;

    constructor() {}

    ngOnInit(): void {}

    onCheckPassword(password: string) {
        this.isMatched = password === protectPassword || !environment.needProtect;
    }
}
