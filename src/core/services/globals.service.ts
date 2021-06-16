import { Injectable, Inject } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { COUNTRY_LIST, CONTINIENT_LIST, languages, POST_LIMIT_COUNT } from '@constants';
import { Country } from '@models';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class GlobalsService {
    monthList: any[] = [
        { label: 'January', value: '1' },
        { label: 'February', value: '2' },
        { label: 'March', value: '3' },
        { label: 'April', value: '4' },
        { label: 'May', value: '5' },
        { label: 'June', value: '6' },
        { label: 'July', value: '7' },
        { label: 'August', value: '8' },
        { label: 'September', value: '9' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
    ];
    languageJson: any;
    slugList: any;
    permissions: any = {};
    permissionList: any;
    userInvitesArray: any = [];
    device = 'desktop';
    previousUrl: string;
    currentUrl: string;

    constructor(
        private cookieService: CookieService,
        private deviceSrv: DeviceDetectorService,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
    ) {
        this.router.events
            .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.urlAfterRedirects;
                console.log('prev=> ', this.previousUrl);
                console.log('curr=> ', this.currentUrl);
            });
        if (deviceSrv.isMobile()) {
            this.device = 'mobile';
        } else if (deviceSrv.isTablet()) {
            this.device = 'tablet';
        }
    }

    checkItem(data, listkey = null) {
        if (!listkey) {
            const flag3 = this.slugList.filter((elememts) => elememts.slug === data)[0];
            const arr1 = ['manage', 'view'];
            if (flag3 && arr1.includes(flag3.access_type)) {
                return true;
            } else {
                return false;
            }
        } else {
            const flag1 = this.slugList.filter((elememt) => elememt.slug === data)[0];
            const flag2 = this.slugList.filter((element1) => element1.slug === data)[0];
            const arr = ['manage', 'view'];
            if ((flag1 && arr.includes(flag1.access_type)) || (flag2 && arr.includes(flag2.access_type))) {
                return true;
            } else {
                return false;
            }
        }
    }

    permissionMethod() {
        this.slugList = JSON.parse(this.cookieService.get('permissionSlug'));
        this.slugList.forEach((element) => {
            this.permissions[element.slug] = {
                manage: element.access_type === 'manage' ? true : false,
                view: element.access_type === 'view' ? true : false,
            };
        });
    }

    countTheString(value: any, count: any) {
        let stringData = value;
        stringData = stringData.replace(/(^\s*)|(\s*$)/gi, '');
        stringData = stringData.replace(/[ ]{2,}/gi, ' ');
        stringData = stringData.replace(/\n /, '\n');
        if (stringData == '') {
            return 0;
        } else {
            const outputLength = stringData.split(' ').length;
            if (outputLength > count) {
                value = stringData
                    .split(' ')
                    .splice(outputLength - 1, 1)
                    .join(' ');
                return outputLength - 1;
            }
            return outputLength;
        }
    }

    getTheMaxLength(value: any, countValue: any) {
        const getLength = this.countTheString(value, countValue);
        return getLength === countValue ? value.length : '';
    }

    getCountry(data: string): Country {
        if (data) {
            return COUNTRY_LIST.find((con: any) => con.isoCode === data.toUpperCase());
        }
        return null;
    }

    getCountryName(isoCode: string): string {
        if (isoCode) {
            const country = COUNTRY_LIST.find((c) => c.isoCode === isoCode.toUpperCase());
            if (country) {
                return country.name;
            }
        }
        return '';
    }

    getContinentName(code: string): string {
        if (code) {
            if (CONTINIENT_LIST[code]) {
                return CONTINIENT_LIST[code];
            }
        }
        return '';
    }

    getLanguage(code: string): string {
        if (code) {
            const language = languages.find((c) => c.value === code.toLowerCase());
            if (language) {
                return language.name;
            }
        }
        return '';
    }

    getLimitCounter() {
        const count = this.cookieService.get('limit_count') ? +this.cookieService.get('limit_count') : POST_LIMIT_COUNT;
        return count;
    }

    setLimitCounter() {
        const count = this.getLimitCounter() > 0 ? this.getLimitCounter() - 1 : 0;
        this.cookieService.set('limit_count', count.toString());
    }

    getJustText(content: any) {
        const contentElement = this.document.createElement('div');
        contentElement.innerHTML = content;
        const images = contentElement.querySelectorAll('img');
        images.forEach((image) => {
            image.parentNode.removeChild(image);
        });
        return contentElement.textContent;
    }
}
