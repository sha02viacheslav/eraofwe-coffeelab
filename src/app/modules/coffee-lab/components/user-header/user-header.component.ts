import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHeaderComponent implements OnInit {
    @Input() prop: any;
    @Input() total: any;
    @Input() enableEllipsis = true;
    @Input() isArticleDetail = false;
    @Input() isRecipeDetail = false;
    @Input() isLandingPage = false;
    orgType: string;

    constructor() {}

    ngOnInit(): void {
        this.orgType =
            this.prop?.company_name ||
            this.prop?.organization_name ||
            this.prop?.organisation_name ||
            this.prop?.organisation_type ||
            this.prop?.org_type;
    }
}
