import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService } from '@services';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-coffee-recipes-view',
    templateUrl: './coffee-recipes-view.component.html',
    styleUrls: ['./coffee-recipes-view.component.scss'],
})
export class CoffeeRecipesViewComponent implements OnInit, OnDestroy {
    rows = 9;
    pageNumber = 1;
    totalRecords = 0;
    destroy$: Subject<boolean> = new Subject<boolean>();
    isAvailableTranslation?: string;
    label?: string;
    ingredientValue?: string;
    searchQuery = '';
    searchIngredient = '';
    coffeeRecipeData: any[] = [];
    isLoading = false;
    forumLanguage: string;
    translationsList: any[] = [
        {
            label: 'Yes',
            value: true,
        },
        {
            label: 'No',
            value: false,
        },
    ];

    labels: any[] = [
        {
            label: 'Easy',
            value: 'Easy',
        },
        {
            label: 'Intermediate',
            value: 'Intermediate',
        },
        {
            label: 'Hard',
            value: 'Hard',
        },
    ];
    orderList: any[] = [
        {
            label: 'Latest',
            value: 'latest',
        },
        {
            label: 'Oldest',
            value: 'oldest',
        },
    ];
    selectedOrder = 'latest';

    constructor(
        private toastService: ToastrService,
        private router: Router,
        public coffeeLabService: CoffeeLabService,
    ) {}

    ngOnInit(): void {
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.destroy$)).subscribe((language) => {
            this.forumLanguage = language;
            this.getCoffeeRecipesData();
        });
    }

    getCoffeeRecipesData(): void {
        this.isLoading = true;
        const params = {
            query: this.searchQuery,
            ingredient: this.searchIngredient,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' ? 'desc' : 'asc',
            level: this.label?.toLowerCase(),
            page: this.pageNumber,
            per_page: this.rows,
        };
        this.coffeeLabService.getForumList('recipe', params, this.forumLanguage).subscribe((res) => {
            if (res.success) {
                if (res.result) {
                    this.coffeeRecipeData = (res.result ?? []).filter((item) => item.publish === true);
                    this.totalRecords = res.result_info.total_count;
                    this.rows = res.result_info.per_page;
                    this.coffeeRecipeData.map((item) => {
                        item.description = this.getJustText(item.description);
                        return item;
                    });
                }
            } else {
                this.toastService.error('Cannot get Recipes data');
            }
            this.isLoading = false;
        });
    }

    getJustText(content: any) {
        const contentElement = document.createElement('div');
        contentElement.innerHTML = content;
        const images = contentElement.querySelectorAll('img');
        images.forEach((image) => {
            image.parentNode.removeChild(image);
        });
        return contentElement.innerHTML;
    }

    getData(event) {
        if (event.page > -1) {
            const currentPage = event.first / this.rows;
            this.pageNumber = currentPage + 1;
            this.getCoffeeRecipesData();
        }
    }

    getLink(item) {
        const url = `${item.lang_code === 'en' || !item.lang_code ? '' : item.lang_code}/recipe/${item.slug}`;
        return url;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
