import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { organizationTypes } from '@constants';
import { GlobalsService, CoffeeLabService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnChanges {
    @ViewChild('myOp', { static: false }) myOp: OverlayPanel;
    @Input() userId: any;
    @Input() orgType: any;
    @Input() size: any;
    @Input() imageUrl: any;
    @Input() shape: any;
    @Input() hasBorder: any;
    orgName: any;
    data: any;
    name: any;
    isOpened = false;
    hiding = false;

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

    show(event) {
        this.hiding = false;
        if (!this.isOpened) {
            this.myOp.show(event);
        }
    }

    hide() {
        if (this.isOpened) {
            this.hiding = true;
            setTimeout(() => {
                if (this.hiding) {
                    this.myOp.hide();
                    this.hiding = false;
                }
            }, 300);
        }
    }

    openChat(): void {
        this.dialogSrv.open(SignupModalComponent, {
            showHeader: false,
            styleClass: 'signup-dialog',
        });
    }
}
