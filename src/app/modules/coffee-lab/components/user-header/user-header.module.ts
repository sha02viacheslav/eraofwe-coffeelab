import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { UserDetailModule } from '../user-detail/user-detail.module';

import { UserHeaderComponent } from './user-header.component';

@NgModule({
    declarations: [UserHeaderComponent],
    exports: [UserHeaderComponent],
    imports: [CommonModule, SharedModule, UserDetailModule],
})
export class UserHeaderModule {}
