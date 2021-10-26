import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    readonly env = environment;
    language: string;
    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {}

    getLang() {
        return getLangRoute(this.coffeeLabService.currentForumLanguage);
    }
}
