import { Component } from '@angular/core';
import { ResizeService } from '@services';
import { DestroyableComponent } from './destroyable.component';

@Component({
    template: '',
})
export class ResizeableComponent extends DestroyableComponent {
    isMobile$ = this.resizeService.isMobile$;
    isTablet$ = this.resizeService.isTablet$;
    isDesktop$ = this.resizeService.isDesktop$;

    constructor(protected resizeService: ResizeService) {
        super();
    }
}
