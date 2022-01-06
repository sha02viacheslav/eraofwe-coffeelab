import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GlobalsService {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    getLimitCounter() {
        // const count = this.cookieService.get('limit_count') ? +this.cookieService.get('limit_count') : POST_LIMIT_COUNT;
        // return count;
        return 3;
    }

    setLimitCounter() {
        // const count = this.getLimitCounter() > 0 ? this.getLimitCounter() - 1 : 0;
        // this.cookieService.set('limit_count', count.toString());
    }
}
