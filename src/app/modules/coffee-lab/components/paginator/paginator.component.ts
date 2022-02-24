import { isPlatformServer } from '@angular/common';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { ResizeableComponent } from '@base-components';
import { ResizeService } from '@services';
import { Paginator } from 'primeng/paginator';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    @Input() totalRecords;
    @Input() rows;
    @Input() page = 0;
    @Output() pageChange = new EventEmitter();
    isServer = false;
    isMobile: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: object, protected resizeService: ResizeService) {
        super(resizeService);
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
        return new Array(Math.ceil(this.totalRecords / this.rows));
    }

    setPaginator() {
        setTimeout(() => {
            this.paginator.changePage(this.page - 1);
        });
    }

    onPaginate(event: any) {
        this.pageChange.emit(event);
    }
}
