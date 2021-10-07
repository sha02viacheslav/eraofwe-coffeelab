import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';
import { QuestionsComponent } from './questions.component';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { LikeDividerModule } from '@modules/coffee-lab/components/like-divider/like-divider.module';
import { SeoPaginatorModule } from '../paginator/paginator.module';

@NgModule({
    declarations: [QuestionsComponent],
    exports: [QuestionsComponent],
    imports: [
        CommonModule,
        SharedModule,
        JoinCommunityModule,
        UserHeaderModule,
        ForumMenuModule,
        LikeDividerModule,
        SeoPaginatorModule,
    ],
})
export class QuestionsModule {}
