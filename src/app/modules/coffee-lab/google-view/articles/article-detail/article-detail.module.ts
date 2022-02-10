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
import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { ArticleDetailComponent } from './article-detail.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
    declarations: [ArticleDetailComponent],
    imports: [
        CommonModule,
        ArticleDetailRoutingModule,
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
        BreadcrumbModule,
    ],
})
export class ArticleDetailModule {}
