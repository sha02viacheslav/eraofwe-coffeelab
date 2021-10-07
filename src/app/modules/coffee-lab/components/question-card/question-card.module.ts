import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { LikeDividerModule } from '@modules/coffee-lab/components/like-divider/like-divider.module';
import { QuestionsCardComponent } from './question-card.component';
import { CategoryListModule } from '../category-list/category-list.module';

@NgModule({
    declarations: [QuestionsCardComponent],
    exports: [QuestionsCardComponent],
    imports: [
        CommonModule,
        SharedModule,
        JoinCommunityModule,
        UserHeaderModule,
        ForumMenuModule,
        LikeDividerModule,
        CategoryListModule,
    ],
})
export class QuestionsCardModule {}
