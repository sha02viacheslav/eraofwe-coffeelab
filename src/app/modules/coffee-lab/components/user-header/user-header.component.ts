import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
    @Input() prop: any;
    @Input() enableEllipsis = true;
    orgType: string;

    constructor() {}

    ngOnInit(): void {
        this.orgType =
            this.prop?.company_name ||
            this.prop?.organization_name ||
            this.prop?.organisation_name ||
            this.prop?.org_type;
    }
}
