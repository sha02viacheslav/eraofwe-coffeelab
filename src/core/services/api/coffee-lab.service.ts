import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@env/environment';
import { ApiResponse, UserProfile } from '@models';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { LangPrefixService } from '../lang-prefix.service';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CoffeeLabService extends ApiService {
    forumLanguage = new BehaviorSubject('en');
    otherCategories = new BehaviorSubject([]);
    searchResult = new BehaviorSubject([]);
    showAd = new BehaviorSubject(true);
    searchInput$ = new BehaviorSubject('');

    get currentForumLanguage(): string {
        return this.forumLanguage.value;
    }
    constructor(
        protected http: HttpClient,
        private langPrefixService: LangPrefixService,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        super(http);
        if (isPlatformBrowser(this.platformId)) {
            this.showAd.next(window.localStorage.getItem('showAd') ? false : true);
        }
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

    getIpInfo(): Observable<any> {
        let key = 'free';
        if (!environment.needProtect) {
            key = '647d0bef7327311cc890ddce5e07a41c97d03d89';
        }
        const apiUrl = `https://api.db-ip.com/v2/${key}/self`;
        return this.http.get(`${apiUrl}`);
    }

    getTrendingPosts(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Accept-Language': 'en' }),
        };
        const params = { article_count: 2, recipe_count: 1 };
        return this.get(
            this.orgPostUrl,
            `general/coffee-lab/trending-posts?${this.serializeParams(params)}`,
            httpOptions,
        );
    }

    subscribeToMailList(email: string) {
        const mailChimpEndpoint =
            'https://nordsud.us6.list-manage.com/subscribe/post-json?u=e93a215496f5c5f6203911365&amp;id=f4f7c2427a';
        let key = 'sewn-tcl';
        if (!environment.needProtect) {
            key = 'era-tcl';
        }
        const params = new HttpParams().set('EMAIL', email).set('MERGE6', key);
        const mailChimpUrl = mailChimpEndpoint + '&' + params.toString();
        return this.http.jsonp(mailChimpUrl, 'c');
    }
}
