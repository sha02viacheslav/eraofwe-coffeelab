import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SharedServiceService {
    public isMobileView = false;
    public windowWidth: number;
    public responsiveStartsAt = 640;
    constructor() {}
}
