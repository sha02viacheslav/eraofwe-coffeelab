import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '@shared';

import { UserProfileComponent } from './user-profile.component';

@NgModule({
    declarations: [UserProfileComponent],
    imports: [CommonModule, UserProfileRoutingModule, SharedModule],
})
export class UserProfileModule {}
