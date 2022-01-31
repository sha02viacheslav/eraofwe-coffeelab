import { isPlatformBrowser, Location } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { OrganizationType, PostType } from '@enums';
import { UserProfile } from '@models';
import { CoffeeLabService, ResizeService, SEOService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    readonly postType = PostType;
    readonly OrgType = OrganizationType;

    isLoading = true;
    showAll = true;
    isBrowser = false;
    isUpdatingProfile = false;
    bannerUrl: string;
    profileUrl: string;
    profileInfo: UserProfile;
    infoForm: FormGroup;
    certificationArray: any[] = [];
    userSlug: any;
    orgType: OrganizationType;
    menuItems = [
        {
            label: 'question_answers',
            postType: PostType.QA,
        },
        {
            label: 'posts',
            postType: PostType.ARTICLE,
        },
        {
            label: 'brewing_guides',
            postType: PostType.RECIPE,
        },
    ];

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private activateRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private router: Router,
        private seoService: SEOService,
        protected resizeService: ResizeService,
        public location: Location,
    ) {
        super(resizeService);
        this.activateRoute.params.subscribe((res) => {
            this.userSlug = res.user_slug;
        });

        if (isPlatformBrowser(this.platformId)) {
            this.isBrowser = true;
            if (this.isMobile$) {
                this.showAll = false;
            }
            window.scrollTo(0, 0);
        }
    }

    ngOnInit(): void {
        this.getUserInfo();
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId) && this.isMobile$) {
            const scrollEvent = fromEvent(window, 'scroll')
                .pipe(debounceTime(100))
                .pipe(takeUntil(this.unsubscribeAll$))
                .subscribe((res) => {
                    if (window.scrollY > 10) {
                        scrollEvent.unsubscribe();
                        this.showAll = true;
                        this.cdr.detectChanges();
                    }
                });
        }
    }

    getUserInfo(): void {
        this.isLoading = true;
        this.cdr.detectChanges();
        this.coffeeLabService.getUserFromSlug(this.userSlug).subscribe((res) => {
            if (res.success) {
                this.profileInfo = res.result;
                this.orgType = this.profileInfo.organization_type;
                this.bannerUrl = this.profileInfo.banner_url;
                this.profileUrl = this.profileInfo.profile_image_url;
                this.certificationArray = res.result?.certificates || [];
                this.setSEO();
                this.isLoading = false;
            } else {
                this.router.navigate(['/']);
            }
            this.cdr.detectChanges();
        });
    }

    setSEO() {
        const title = `${this.profileInfo?.firstname} ${this.profileInfo?.lastname} - ${
            this.orgType === OrganizationType.CONSUMER ? 'Coffee consumers' : 'Coffee experts'
        }`;
        const description =
            (this.profileInfo?.about_me || `${this.profileInfo?.firstname} ${this.profileInfo?.lastname}`) +
            ' - A global coffee marketplace that brings together all members of the supply chain and shifts the value of the coffee brand back to the growers';
        this.seoService.setSEO(title, description);
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
