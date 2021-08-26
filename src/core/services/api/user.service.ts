import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    socialLogin(user: any) {
        const data = {
            api_call: '/co/users/social-login',
            method: 'POST',
            data: user,
        };
        return this.http.post(this.orgPostUrl, data, { withCredentials: true });
    }
}
