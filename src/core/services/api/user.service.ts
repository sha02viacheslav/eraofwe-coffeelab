import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends ApiService {
    constructor(protected http: HttpClient) {
        super(http);
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
