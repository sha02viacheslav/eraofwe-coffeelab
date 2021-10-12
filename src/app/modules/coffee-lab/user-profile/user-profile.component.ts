import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoffeeLabService, GlobalsService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';
import { OrganizationType, PostType } from '@enums';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    readonly postType = PostType;
    readonly OrgType = OrganizationType;

    isLoading = false;
    isUpdatingProfile = false;
    bannerUrl: string;
    profileUrl: string;
    profileInfo?: any;
    infoForm: FormGroup;
    certificationArray: any[] = [];
    userSlug: any;
    // queryOrganization: any;
    orgType: OrganizationType;
    menuItems = [
        {
            label: 'question_answers',
            postType: PostType.QA,
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'posts',
            postType: PostType.ARTICLE,
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
        {
            label: 'brewing_guides',
            postType: PostType.RECIPE,
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
    ];

    constructor(
        private activateRoute: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private coffeeLabService: CoffeeLabService,
        public globals: GlobalsService,
        public location: Location,
        private dialogSrv: DialogService,
    ) {
        this.activateRoute.params.subscribe((res) => {
            this.userSlug = res.user_slug;
        });
        this.getUserInfo();
    }

    ngOnInit(): void {}

    getUserInfo(): void {
        this.isLoading = true;
        this.coffeeLabService.getUserFromSlug(this.userSlug).subscribe((res: any) => {
            if (res.success) {
                this.profileInfo = res.result;
                this.bannerUrl = this.profileInfo.banner_url;
                this.profileUrl = this.profileInfo.profile_image_url;
                this.certificationArray = res.result?.certificates || [];
                this.isLoading = false;
            } else {
                this.toastr.error('Error while fetching profile');
                this.router.navigate(['/']);
            }
        });
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
