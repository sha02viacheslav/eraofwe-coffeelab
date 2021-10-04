import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDetailRoutingModule } from './question-detail-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { TranslationDropdownModule } from '@modules/coffee-lab/components/translation-dropdown/translation-dropdown.module';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { LikeDividerModule } from '@modules/coffee-lab/components/like-divider/like-divider.module';

import { QuestionDetailComponent } from './question-detail.component';

@NgModule({
    declarations: [QuestionDetailComponent],
    imports: [
        CommonModule,
        QuestionDetailRoutingModule,
        SharedModule,
        UserHeaderModule,
        TranslationDropdownModule,
        JoinCommunityModule,
        ForumMenuModule,
        LikeDividerModule,
    ],
})
export class QuestionDetailModule {}
