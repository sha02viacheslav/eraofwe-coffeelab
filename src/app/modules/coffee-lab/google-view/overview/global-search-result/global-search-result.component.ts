import { Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-global-search-result',
    templateUrl: './global-search-result.component.html',
    styleUrls: ['./global-search-result.component.scss'],
})
export class GlobalSearchResultComponent implements OnInit, OnChanges {
    @Input() searchResult: any;
    @Input() keyword: string;
    filterForumTypes: any[] = [];
    selectedFilterForumType: string;
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Oldest', value: 'oldest' },
    ];
    questionSort = 'latest';
    articleSort = 'latest';
    recipeSort = 'latest';
    isLoading: boolean;

    constructor(private ngZone: NgZone) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        this.setFilterForumTypes();
    }

    sortByDate(array: any[], sort: string): any {
        const sorter = (a, b) => {
            if (sort === 'latest') {
                return (
                    new Date(b.created_at || b.posted_at).getTime() - new Date(a.created_at || a.posted_at).getTime()
                );
            } else {
                return (
                    new Date(a.created_at || a.posted_at).getTime() - new Date(b.created_at || b.posted_at).getTime()
                );
            }
        };
        return array.sort(sorter);
    }

    handleSort(type: string, sort: string): void {
        this.isLoading = true;
        setTimeout(() => {
            this.searchResult[type] = this.sortByDate(this.searchResult[type], sort);
            this.isLoading = false;
        }, 0);
    }

    setFilterForumTypes(): void {
        const filterForumTypes = [];
        if (this.searchResult.questions.length) {
            filterForumTypes.push({
                title: 'qa_post',
                type: 'question',
            });
        }
        if (this.searchResult.articles.length) {
            filterForumTypes.push({
                title: 'posts',
                type: 'article',
            });
        }
        if (this.searchResult.recipes.length) {
            filterForumTypes.push({
                title: 'brewing_guides',
                type: 'recipe',
            });
        }
        this.filterForumTypes = filterForumTypes;
        this.selectedFilterForumType = this.filterForumTypes[0]?.type;
    }

    onChangeFilterBy(type: string): void {
        this.selectedFilterForumType = type;
    }
}
