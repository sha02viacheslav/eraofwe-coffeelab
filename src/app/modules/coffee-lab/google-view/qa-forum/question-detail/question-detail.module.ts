import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDetailRoutingModule } from './question-detail-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { TranslationDropdownModule } from '@modules/coffee-lab/components/translation-dropdown/translation-dropdown.module';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { LikeDividerModule } from '@modules/coffee-lab/components/like-divider/like-divider.module';
import { NgxJsonLdModule } from 'ngx-json-ld';

import { QuestionDetailComponent } from './question-detail.component';
import { CategoryListModule } from '@modules/coffee-lab/components/category-list/category-list.module';

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
        NgxJsonLdModule,
        CategoryListModule,
    ],
})
export class QuestionDetailModule {}
