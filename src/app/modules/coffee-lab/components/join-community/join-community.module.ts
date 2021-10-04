import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';

import { JoinCommunityComponent } from './join-community.component';

@NgModule({
    declarations: [JoinCommunityComponent],
    exports: [JoinCommunityComponent],
    imports: [CommonModule, SharedModule],
})
export class JoinCommunityModule {}
