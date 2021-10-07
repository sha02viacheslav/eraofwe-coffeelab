import { Component, Input, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
    @Input() categoryList: any[] = [];

    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {}

    getLink(slug: string) {
        return '/' + getLangRoute(this.coffeeLabService.currentForumLanguage) + '/' + slug;
    }
}
