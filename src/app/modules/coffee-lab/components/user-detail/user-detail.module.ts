import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { SkeletonModule } from 'primeng/skeleton';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { UserDetailComponent } from './user-detail.component';

@NgModule({
    declarations: [UserDetailComponent],
    exports: [UserDetailComponent],
    imports: [CommonModule, SharedModule, SkeletonModule, OverlayPanelModule],
})
export class UserDetailModule {}
