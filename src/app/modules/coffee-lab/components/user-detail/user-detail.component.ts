import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ORG_LIST } from '@constants';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    @Input() data: any;
    orgName: any;
    @Output() handleClose = new EventEmitter();
    constructor(public globalsService: GlobalsService) {}

    ngOnInit(): void {
        this.orgName = ORG_LIST[this.data.organization_type];
    }
}
