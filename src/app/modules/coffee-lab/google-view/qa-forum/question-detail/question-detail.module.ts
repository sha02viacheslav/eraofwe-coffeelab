import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryListModule } from '@modules/coffee-lab/components/category-list/category-list.module';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';
import { LikeDividerModule } from '@modules/coffee-lab/components/like-divider/like-divider.module';
import { SquareAdsModule } from '@modules/coffee-lab/components/square-ads/square-ads.module';
import { TranslateTostModule } from '@modules/coffee-lab/components/translate-toast/translate-toast.module';
import { TranslationDropdownModule } from '@modules/coffee-lab/components/translation-dropdown/translation-dropdown.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { SharedModule } from '@shared';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { QuestionDetailRoutingModule } from './question-detail-routing.module';
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
        NgxJsonLdModule,
        CategoryListModule,
        TranslateTostModule,
        SquareAdsModule,
    ],
})
export class QuestionDetailModule {}
