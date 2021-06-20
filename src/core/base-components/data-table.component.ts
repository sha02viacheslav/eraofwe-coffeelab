import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ResizeableComponent } from './resizeable.component';
import { ResizeService } from '@services';
import { ApiResponse, PageInfo } from '@models';
import { takeUntil } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api/public_api';

@Component({
    template: '',
})
export class DataTableComponent<T> extends ResizeableComponent {
    readonly isMobile$ = this.resizeService.isMobile$;

    protected dataStream$: Observable<ApiResponse<T[]>>;

    loading = false;
    pageInfo: PageInfo = { page: 1, per_page: 10, total_count: 0 };
    tableData: T[] = [];

    @Input() searchOptions: any;

    get rowsPerPage(): number {
        if (this.searchOptions && this.searchOptions.per_page) {
            return this.searchOptions.per_page;
        }

        return this.pageInfo.per_page;
    }

    constructor(protected resizeService: ResizeService) {
        super(resizeService);
    }

    protected subscribeTo(stream$: Observable<ApiResponse<T[]>>): void {
        this.dataStream$ = stream$;
        this.dataStream$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res) => {
            if (res) {
                this.tableData = res.result;
                this.pageInfo = res.result_info;
            }

            this.loading = false;
        });
    }

    protected getLoadingOptions(event?: LazyLoadEvent): any {
        let options = this.searchOptions;

        if (event) {
            const page = event.first / event.rows + 1;
            options = {
                ...options,
                page,
                per_page: this.pageInfo.per_page,
                sort_order: event.sortOrder === 1 ? 'asc' : 'desc',
                sort_by: event.sortField,
            };
        }

        // To prevent expression has been checked error
        setTimeout(() => (this.loading = true), 0);

        return options;
    }
}
