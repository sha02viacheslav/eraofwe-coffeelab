import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { organizationTypes } from '@constants';
import { GlobalsService, CoffeeLabService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnChanges {
    @Input() userId: any;
    @Input() orgType: any;
    @Input() size: any;
    @Input() imageUrl: any;
    @Input() shape: any;
    @Input() hasBorder: any;
    orgName: any;
    data: any;
    name: any;

    constructor(
        public globalsService: GlobalsService,
        public dialogSrv: DialogService,
        private coffeeLabService: CoffeeLabService,
    ) {}
    ngOnChanges(): void {
        this.orgName = organizationTypes.find((item) => item.value === this.orgType?.toUpperCase())?.title;
        if (this.userId && this.orgType) {
            this.coffeeLabService.getUserDetail(this.userId, this.orgType.toLowerCase()).subscribe((res) => {
                if (res.success) {
                    this.data = res.result;
                    this.name = `${this.data?.firstname} ${this.data?.lastname}`;
                }
            });
        }
    }

    ngOnInit(): void {}

    openChat(): void {
        this.dialogSrv.open(SignupModalComponent, {
            showHeader: false,
            styleClass: 'signup-dialog',
        });
    }
}
