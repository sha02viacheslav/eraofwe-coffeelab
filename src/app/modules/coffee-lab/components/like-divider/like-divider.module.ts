import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { SignupModalModule } from '../signup-modal/signup-modal.module';

import { LikeDividerComponent } from './like-divider.component';

@NgModule({
    declarations: [LikeDividerComponent],
    exports: [LikeDividerComponent],
    imports: [CommonModule, SharedModule, SignupModalModule],
})
export class LikeDividerModule {}
