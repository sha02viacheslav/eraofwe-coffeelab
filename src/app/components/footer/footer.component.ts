import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    hostName = location.host;
    hostProtocol = location.protocol;
    readonly env = environment;
    constructor() {}

    ngOnInit(): void {
        console.log(this.hostName, this.hostProtocol);
    }
}
