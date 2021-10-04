import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QaForumViewRoutingModule } from './qa-forum-view-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { PublishForumModule } from '@modules/coffee-lab/components/publish-forum/publish-forum.module';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { LikeDividerModule } from '@modules/coffee-lab/components/like-divider/like-divider.module';
import { SeoPaginatorModule } from '@modules/coffee-lab/components/paginator/paginator.module';

import { QaForumViewComponent } from './qa-forum-view.component';

@NgModule({
    declarations: [QaForumViewComponent],
    imports: [
        CommonModule,
        QaForumViewRoutingModule,
        SharedModule,
        UserHeaderModule,
        PublishForumModule,
        JoinCommunityModule,
        ForumMenuModule,
        LikeDividerModule,
        SeoPaginatorModule,
    ],
})
export class QaForumViewModule {}
