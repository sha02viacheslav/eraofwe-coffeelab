import { Component, HostListener } from '@angular/core';
import { ResizeService } from '@services';
import { takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from './destroyable.component';

@Component({
    template: '',
})
export class ResizeableComponent extends DestroyableComponent {
    isMobile$ = this.resizeService.isMobile$.pipe(takeUntil(this.unsubscribeAll$));
    isTablet$ = this.resizeService.isTablet$.pipe(takeUntil(this.unsubscribeAll$));
    isDesktop$ = this.resizeService.isDesktop$.pipe(takeUntil(this.unsubscribeAll$));

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.resizeService.onResize(event.currentTarget.innerWidth);
    }

    constructor(protected resizeService: ResizeService) {
        super();
    }
}
