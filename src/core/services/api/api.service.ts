export class Api {}
import { HttpClient } from '@angular/common/http';
import { OrganizationType } from '@enums';
import { environment } from '@env/environment';
import { ApiResponse } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export class ApiService {
    readonly orgType = OrganizationType.CONSUMER;
    protected orgPostUrl: string;

    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        this.orgPostUrl = `${environment.apiURL}/${this.orgType}/api`;
    }

    protected get(url: string, apiCall: string, options?: object): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${url}?api_call=${encodeURIComponent(`/${apiCall}`)}`, options);
    }

    protected serializeParams(obj: object): string {
        const str = [];
        for (const prop in obj) {
            if (
                obj.hasOwnProperty(prop) &&
                obj[prop] !== null &&
                obj[prop] !== undefined &&
                obj[prop] !== '' &&
                !(Array.isArray(obj[prop]) && !obj[prop].length)
            ) {
                str.push(
                    encodeURIComponent(prop) +
                        '=' +
                        encodeURIComponent(Array.isArray(obj[prop]) ? obj[prop].join(',') : obj[prop]),
                );
            }
        }
        return str.join('&');
    }
}
