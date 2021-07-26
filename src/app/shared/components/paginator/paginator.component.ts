import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { Paginator } from 'primeng/paginator';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, AfterViewInit {
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() totalRecords;
    @Input() rows;
    @Input() page = 0;
    @Output() onPageChange = new EventEmitter();
    isServer = false;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        if (isPlatformServer(this.platformId)) {
            this.isServer = true;
        }
    }

    ngOnInit(): void {
        this.setPaginator();
    }

    ngAfterViewInit() {
        this.setPaginator();
    }

    pageCounter() {
        return new Array(parseInt('' + this.totalRecords / this.rows));
    }

    setPaginator() {
        setTimeout(() => {
            this.paginator.changePage(this.page - 1);
        });
    }

    onPaginate(event: any) {
        this.onPageChange.emit(event);
    }
}
