import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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

    getJustText(content: any) {
        if (content) {
            const contentElement = this.document.createElement('div');
            contentElement.innerHTML = content;
            return contentElement.textContent;
        } else {
            return '';
        }
    }
}
