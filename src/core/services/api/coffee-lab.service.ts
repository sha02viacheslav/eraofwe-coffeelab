import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LangPrefixService } from '../lang-prefix.service';
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
    constructor(
        protected cookieSrv: CookieService,
        protected http: HttpClient,
        private langPrefixService: LangPrefixService,
    ) {
        super(cookieSrv, http);
        this.forumLanguage.next(this.langPrefixService.langPrefix());
    }

    getForumList(type: string, options?: any, language = this.currentForumLanguage): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Accept-Language': language }),
        };
        return this.get(this.orgPostUrl, `general/${type}s?${this.serializeParams(options)}`, httpOptions);
    }

    getForumDetails(type: string, idOrSlug: string) {
        return this.get(this.orgPostUrl, `general/${type}s/${idOrSlug}`);
    }

    getUserDetail(userId: string | number, orgType: string) {
        return this.get(this.orgPostUrl, `general/${orgType}/users/${userId}`);
    }

    getCommentList(type: string, slug: any): any {
        return this.get(this.orgPostUrl, `general/${type}s/${slug}/comments`);
    }
}
