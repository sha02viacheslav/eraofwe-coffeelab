import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { SignupModalModule } from '../signup-modal/signup-modal.module';
import { MenuModule } from 'primeng/menu';

import { ForumMenuComponent } from './forum-menu.component';

@NgModule({
    declarations: [ForumMenuComponent],
    exports: [ForumMenuComponent],
    imports: [CommonModule, SharedModule, SignupModalModule, MenuModule],
})
export class ForumMenuModule {}
