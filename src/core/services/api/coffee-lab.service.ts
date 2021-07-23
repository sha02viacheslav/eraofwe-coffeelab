import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CoffeeLabService extends ApiService {
    forumLanguage = new BehaviorSubject('en');
    gotTranslations = new BehaviorSubject({});

    get currentForumLanguage(): string {
        return this.forumLanguage.value;
    }
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getForumList(type: string, options?: any, language = this.currentForumLanguage): Observable<any> {
        const data = {
            api_call: `/general/${type}s?${this.serializeParams(options)}`,
            method: 'GET',
        };
        const httpOptions = {
            headers: new HttpHeaders({ 'Accept-Language': language }),
        };
        return this.http.post(this.generalUrl, data, httpOptions);
    }

    getForumDetails(type: string, idOrSlug: string) {
        return this.post(this.generalUrl, `general/${type}s/${idOrSlug}`, 'GET');
    }

    healthCheck() {
        return this.post(this.postUrl, `health-check`, 'GET');
    }

    getUserDetail(userId: string | number, orgType: string) {
        return this.post(this.generalUrl, `general/${orgType}/users/${userId}`, 'GET');
    }
}
