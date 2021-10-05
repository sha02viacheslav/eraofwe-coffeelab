import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QaForumViewRoutingModule } from './qa-forum-view-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { LikeDividerModule } from '@modules/coffee-lab/components/like-divider/like-divider.module';
import { SeoPaginatorModule } from '@modules/coffee-lab/components/paginator/paginator.module';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { QaForumViewComponent } from './qa-forum-view.component';

@NgModule({
    declarations: [QaForumViewComponent],
    imports: [
        CommonModule,
        QaForumViewRoutingModule,
        SharedModule,
        UserHeaderModule,
        JoinCommunityModule,
        ForumMenuModule,
        LikeDividerModule,
        SeoPaginatorModule,
        NgxJsonLdModule,
        InputTextModule,
        DropdownModule,
    ],
})
export class QaForumViewModule {}
