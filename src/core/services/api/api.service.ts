export class Api {}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse, RequestDto } from '@models';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

type HttpMethod = '' | 'GET' | 'POST' | 'PUT' | 'DELETE';

export class ApiService {
    protected orgType: string;
    protected postUrl: string;
    protected deleteUrl: string;
    protected orgPostUrl: string;
    protected orgPutUrl: string;
    protected orgDeleteUrl: string;
    protected fileUploadUrl: string;
    protected putFileUploadUrl: string;
    protected sendEmailUrl: string;
    protected generalUrl: string;

    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        this.orgType = 'co';
        this.postUrl = `${environment.apiURL}/api`;
        this.deleteUrl = `${environment.apiURL}/deleteapi`;
        this.orgPostUrl = `${environment.apiURL}/${this.orgType}/api`;
        this.orgPutUrl = `${environment.apiURL}/${this.orgType}/putapi`;
        this.orgDeleteUrl = `${environment.apiURL}/${this.orgType}/deleteapi`;
        this.fileUploadUrl = `${environment.apiURL}/${this.orgType}/filesfolders`;
        this.putFileUploadUrl = `${environment.apiURL}/${this.orgType}/putfilesfolders`;
        this.sendEmailUrl = `${environment.apiURL}/sendemail`;
        this.generalUrl = `${environment.apiURL}/${this.orgType}/general`;
    }

    protected post(
        url: string,
        apiCall: string,
        method: HttpMethod = 'GET',
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDto(apiCall, method, data);

        return this.http.post<ApiResponse<any>>(`${url}`, dto);
    }

    protected postWithOrg(
        url: string,
        apiCall: string,
        method: HttpMethod = 'GET',
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDtoWithOrg(apiCall, method, data);

        return this.http.post<ApiResponse<any>>(`${url}`, dto);
    }

    protected putWithOrg(
        url: string,
        apiCall: string,
        method: HttpMethod = '',
        data?: object,
    ): Observable<ApiResponse<any>> {
        const dto = this.getDtoWithOrg(apiCall, method, data);

        return this.http.put<ApiResponse<any>>(`${url}`, dto);
    }

    protected getDtoWithOrg(apiCall: string, method: string, data?: object): RequestDto {
        const orgId = this.cookieSrv.get('roaster_id');
        const dto: RequestDto = {
            api_call: `/${this.orgType}/${orgId}/${apiCall}`,
            method,
            token: this.cookieSrv.get('Auth'),
        };
        if (data) {
            dto.data = data;
        }
        return dto;
    }

    protected getDto(apiCall: string, method: string, data?: object): RequestDto {
        const dto: RequestDto = {
            api_call: `/${apiCall}`,
            method,
            token: this.cookieSrv.get('Auth'),
        };
        if (data) {
            dto.data = data;
        }
        return dto;
    }

    protected serializeParams(obj: object): string {
        const str = [];
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop) && !_.isNull(obj[prop]) && !_.isUndefined(obj[prop])) {
                str.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
            }
        }
        return str.join('&');
    }
}
