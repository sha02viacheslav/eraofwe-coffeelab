import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ResizeService {
    private readonly tabletMinWidth = 768;
    private readonly desktopMinWidth = 992;

    private readonly isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth < this.tabletMinWidth);
    private readonly isTabletSubject = new BehaviorSubject<boolean>(
        window.innerWidth < this.desktopMinWidth && window.innerWidth >= this.tabletMinWidth,
    );
    private readonly isDesktopSubject = new BehaviorSubject<boolean>(window.innerWidth >= this.desktopMinWidth);

    get isMobile$(): Observable<boolean> {
        return this.isMobileSubject.asObservable().pipe(distinctUntilChanged());
    }

    get isTablet$(): Observable<boolean> {
        return this.isTabletSubject.asObservable().pipe(distinctUntilChanged());
    }

    get isDesktop$(): Observable<boolean> {
        return this.isDesktopSubject.asObservable().pipe(distinctUntilChanged());
    }

    isMobile(): boolean {
        return this.isMobileSubject.getValue();
    }

    isTablet(): boolean {
        return this.isTabletSubject.getValue();
    }

    isDesktop(): boolean {
        return this.isDesktopSubject.getValue();
    }

    onResize(width: number): void {
        this.isMobileSubject.next(width < this.tabletMinWidth);
        this.isTabletSubject.next(width < this.desktopMinWidth && width >= this.tabletMinWidth);
        this.isDesktopSubject.next(width >= this.desktopMinWidth);
    }
}
