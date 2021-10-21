import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrganizationType } from '@enums';
import { GlobalsService, CoffeeLabService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    readonly OrgType = OrganizationType;
    @ViewChild('myOp', { static: false }) myOp: OverlayPanel;
    @Input() userId: number;
    @Input() orgType: OrganizationType;
    @Input() size: number;
    @Input() imageUrl: string;
    @Input() name: string;
    @Input() originalImageUrl: string;
    data: any;
    isOpened = false;
    hiding = false;
    showMore: boolean;
    public defaultProfileImage = 'assets/images/profile.svg';

    constructor(
        public globalsService: GlobalsService,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
    ) {}

    ngOnInit(): void {
        this.originalImageUrl = this.imageUrl;
    }

    getUserData() {
        if (this.userId && this.orgType && !this.data) {
            this.orgType = this.orgType.toLowerCase() as OrganizationType;
            this.coffeeLabService.getUserDetail(this.userId, this.orgType).subscribe((res) => {
                if (res.success) {
                    this.data = res.result;
                    this.originalImageUrl =
                        this.data?.profile_image_url || this.data?.profile_image_thumb_url || this.imageUrl;
                    this.name = `${this.data?.firstname} ${this.data?.lastname}`;
                }
            });
        }
    }

    show(event) {
        this.hiding = false;
        if (!this.isOpened && this.userId) {
            this.getUserData();
            this.myOp.show(event);
            this.showMore = false;
            setTimeout(() => (this.showMore = true), 800);
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
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
