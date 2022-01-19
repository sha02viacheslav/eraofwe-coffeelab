import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GlobalsService {
    constructor(@Inject(DOCUMENT) private document: Document) {}

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
