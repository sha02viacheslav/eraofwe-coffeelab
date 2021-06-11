import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalsService } from '@services';
import { Router } from '@angular/router';
@Component({
    selector: 'app-coffee-lab',
    templateUrl: './coffee-lab.component.html',
    styleUrls: ['./coffee-lab.component.scss'],
})
export class CoffeeLabComponent implements OnInit {
    constructor(
        private translateService: TranslateService,
        private router: Router,
        private globalsService: GlobalsService,
    ) {}

    ngOnInit(): void {
        const browserLang = this.translateService.getBrowserLang();
        let currentRouter = this.globalsService.currentUrl;
        if (this.globalsService.currentUrl.indexOf('/overview') !== 0) {
            currentRouter = this.globalsService.currentUrl.substr(3);
        }
        this.router.navigate([`/${browserLang}${currentRouter}`]);
    }
}
