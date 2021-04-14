import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit, OnChanges {
    @Input() prop: any;
    userDetails: any;

    constructor(private coffeeLabService: CoffeeLabService, private toastService: ToastrService) {}
    ngOnChanges(changes: SimpleChanges): void {
        if (this.prop) {
            this.getUserDetails();
        }
    }

    ngOnInit(): void {}

    getUserDetails() {
        this.coffeeLabService
            .getUserDetail(this.prop.user_id || this.prop.posted_by, this.prop.org_type || this.prop.organisation_type)
            .subscribe((res: any) => {
                if (res.success) {
                    this.userDetails = res.result;
                } else {
                    this.toastService.error('Cannot get user details.');
                }
            });
    }
}
