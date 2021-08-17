import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
    @Input() prop: any;
    @Input() total: any;
    @Input() enableEllipsis = true;
    orgType: string;

    constructor(public route: ActivatedRoute) {}

    ngOnInit(): void {
        console.log(this.prop);
        this.orgType =
            this.prop?.company_name ||
            this.prop?.organization_name ||
            this.prop?.organisation_name ||
            this.prop?.org_type;
    }
}
