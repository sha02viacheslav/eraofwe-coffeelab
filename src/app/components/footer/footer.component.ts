import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { CoffeeLabService } from '../../../core/services/api/coffee-lab.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    hostName = location.host;
    hostProtocol = location.protocol;
    readonly env = environment;
    constructor(public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {}
}
