import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
    @Input() categoryList: any[] = [];
    @Input() isArticlePage: boolean;

    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {}

    getLink(slug: string) {
        return '/' + getLangRoute(this.coffeeLabService.currentForumLanguage) + '/' + slug;
    }
}
