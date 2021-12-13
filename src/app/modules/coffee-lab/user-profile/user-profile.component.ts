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
import { CoffeeLabService, ResizeService } from '@services';
import { ToastrService } from 'ngx-toastr';
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

    isLoading = false;
    showAll = true;
    isBrowser = false;
    isUpdatingProfile = false;
    bannerUrl: string;
    profileUrl: string;
    profileInfo?: any;
    infoForm: FormGroup;
    certificationArray: any[] = [];
    userSlug: any;
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
        @Inject(PLATFORM_ID) private platformId: object,
        private activateRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private coffeeLabService: CoffeeLabService,
        private dialogSrv: DialogService,
        private router: Router,
        private toastr: ToastrService,
        protected resizeService: ResizeService,
        public location: Location,
    ) {
        super(resizeService);
        this.activateRoute.params.subscribe((res) => {
            this.userSlug = res.user_slug;
        });
        this.getUserInfo();

        if (isPlatformBrowser(this.platformId)) {
            this.isBrowser = true;
            if (this.isMobile$) {
                this.showAll = false;
            }
            window.scrollTo(0, 0);
        }
    }

    ngOnInit(): void {}

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
            this.cdr.detectChanges();
        });
    }

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }
}
