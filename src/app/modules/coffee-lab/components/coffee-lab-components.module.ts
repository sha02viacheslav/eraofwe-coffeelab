import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';

import { ForumMenuComponent } from './forum-menu/forum-menu.component';
import { JoinCommunityComponent } from './join-community/join-community.component';
import { LikeDividerComponent } from './like-divider/like-divider.component';
import { PublishForumComponent } from './publish-forum/publish-forum.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';

const COMPONENTS = [
    ForumMenuComponent,
    JoinCommunityComponent,
    LikeDividerComponent,
    PublishForumComponent,
    SignupModalComponent,
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [CommonModule, SharedModule],
})
export class CoffeeLabComponentsModule {}
