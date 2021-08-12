import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import * as moment from 'moment';
import { CoffeeLabService, GlobalsService } from '@services';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
    isLoading = false;
    isUpdatingProfile = false;
    previewUrl?: string;
    profileInfo?: any;
    infoForm: FormGroup;

    queryUserId: any;
    queryOrganization: any;

    constructor(
        private activateRoute: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private coffeeLabService: CoffeeLabService,
        public globals: GlobalsService,
        public location: Location,
    ) {
        this.queryUserId = this.activateRoute.snapshot.queryParamMap.get('user_id');
        this.queryOrganization = this.activateRoute.snapshot.queryParamMap.get('organization') || 'sa';
        this.getUserInfo();
    }

    ngOnInit(): void {}

    getUserInfo(): void {
        this.isLoading = true;
        this.coffeeLabService.getUserDetail(this.queryUserId, this.queryOrganization).subscribe((res: any) => {
            if (res.success) {
                this.profileInfo = res.result;
                this.previewUrl = this.profileInfo.profile_image_url;
                this.isLoading = false;
            } else {
                this.toastr.error('Error while fetching profile');
                this.router.navigate(['/']);
            }
        });
    }
}
