import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-coffee-lab',
    templateUrl: './coffee-lab.component.html',
    styleUrls: ['./coffee-lab.component.scss'],
})
export class CoffeeLabComponent implements OnInit {
    constructor(private translateService: TranslateService, private router: Router) {
        const browserLang = this.translateService.getBrowserLang();
        this.router.navigate([`/${browserLang}/overview`]);
    }

    ngOnInit(): void {}
}
