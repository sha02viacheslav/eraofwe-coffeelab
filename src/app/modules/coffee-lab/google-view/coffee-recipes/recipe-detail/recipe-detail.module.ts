import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryListModule } from '@modules/coffee-lab/components/category-list/category-list.module';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';
import { PopularPostsModule } from '@modules/coffee-lab/components/popular-posts/popular-posts.module';
import { RectangleAdsModule } from '@modules/coffee-lab/components/rectangle-ads/rectangle-ads.module';
import { TranslateTostModule } from '@modules/coffee-lab/components/translate-toast/translate-toast.module';
import { TranslationDropdownModule } from '@modules/coffee-lab/components/translation-dropdown/translation-dropdown.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { SharedModule } from '@shared';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { RecipeDetailRoutingModule } from './recipe-detail-routing.module';
import { RecipeDetailComponent } from './recipe-detail.component';

@NgModule({
    declarations: [RecipeDetailComponent],
    imports: [
        CommonModule,
        RecipeDetailRoutingModule,
        SharedModule,
        UserHeaderModule,
        TranslationDropdownModule,
        JoinCommunityModule,
        ForumMenuModule,
        NgxJsonLdModule,
        CategoryListModule,
        TranslateTostModule,
        RectangleAdsModule,
        PopularPostsModule,
    ],
})
export class RecipeDetailModule {}
