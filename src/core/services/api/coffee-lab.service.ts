import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CoffeeLabService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getForumList(type: string) {
        return this.post(this.generalUrl, `general/${type}s`, 'GET');
    }

    getForumDetails(type: string, idOrSlug: string) {
        return this.post(this.generalUrl, `general/${type}s/${idOrSlug}`, 'GET');
    }
}
