import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiResponse, UserProfile } from '@models';
import { BehaviorSubject, Observable } from 'rxjs';
import { LangPrefixService } from '../lang-prefix.service';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CoffeeLabService extends ApiService {
    forumLanguage = new BehaviorSubject('en');
    otherCategories = new BehaviorSubject([]);

    get currentForumLanguage(): string {
        return this.forumLanguage.value;
    }
    constructor(
        protected http: HttpClient,
        private langPrefixService: LangPrefixService,
        @Inject(DOCUMENT) private document: Document, // private dialogSrv: DialogService,
    ) {
        super(http);
        this.forumLanguage.next(this.langPrefixService.langPrefix());
    }

    getForumList(type: string, options: any = {}, language = this.currentForumLanguage): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Accept-Language': language }),
        };
        options.language = language;
        return this.get(this.orgPostUrl, `general/${type}s?${this.serializeParams(options)}`, httpOptions);
    }

    getForumDetails(type: string, idOrSlug: string) {
        return this.get(this.orgPostUrl, `general/${type}s/${idOrSlug}`);
    }

    getPopularList(type: string, options?: any, language = this.currentForumLanguage): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Accept-Language': language }),
        };
        return this.get(
            this.orgPostUrl,
            `general/coffee-lab/popular-posts/${type}s?${this.serializeParams(options)}`,
            httpOptions,
        );
    }

    getUserDetail(userId: string | number, orgType: string): Observable<ApiResponse<UserProfile>> {
        return this.get(this.orgPostUrl, `general/${orgType}/users/${userId}`);
    }

    getUserFromSlug(slug: string): Observable<ApiResponse<UserProfile>> {
        return this.get(this.orgPostUrl, `general/users/${slug}`);
    }

    getCommentList(type: string, slug: any): any {
        return this.get(this.orgPostUrl, `general/${type}s/${slug}/comments`);
    }

    getCategory(params: any): Observable<any> {
        return this.get(this.orgPostUrl, `general/categories?${this.serializeParams(params)}`);
    }

    getTopWriters(options): Observable<any> {
        return this.get(this.orgPostUrl, `general/coffee-lab/top-writers?${this.serializeParams(options)}`);
    }

    getCountries() {
        const apiUrl = 'https://api.db-ip.com/v2/free/self';
        return this.http.get(`${apiUrl}`);
        // `${apiUrl},23.92.112.0,2.82.132.160,1.178.224.0,80.72.144.0,1.179.112.0,54.93.50.54,102.129.255.0,102.129.205.0`,
    }
}
