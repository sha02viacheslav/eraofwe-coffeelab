import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeLabRoutingModule } from './coffee-lab-routing.module';
import { SharedModule } from '@shared';

import { CoffeeLabComponent } from './coffee-lab.component';
import { CoffeeRecipesViewComponent } from './google-view/coffee-recipes/coffee-recipes-view/coffee-recipes-view.component';
import { RecipeDetailComponent } from './google-view/coffee-recipes/recipe-detail/recipe-detail.component';
import { QaForumViewComponent } from './google-view/qa-forum/qa-forum-view/qa-forum-view.component';
import { QuestionDetailComponent } from './google-view/qa-forum/question-detail/question-detail.component';
import { ArticlesViewComponent } from './google-view/articles/articles-view/articles-view.component';
import { ArticleDetailComponent } from './google-view/articles/article-detail/article-detail.component';

import { TranslationDropdownComponent } from './components/translation-dropdown/translation-dropdown.component';
import { ForumCardComponent } from './components/forum-card/forum-card.component';
import { BottomBannerComponent } from './components/bottom-banner/bottom-banner.component';
import { SearchForumComponent } from './components/search-forum/search-forum.component';
import { JsonLdComponent } from './components/json-ld/json-ld.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { EraOfWeComponent } from './google-view/era-of-we/era-of-we.component';
import { JoinCommunityComponent } from './components/join-community/join-community.component';
import { ForumMenuComponent } from './components/forum-menu/forum-menu.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { OverviewComponent } from './google-view/overview/overview.component';
import { LanguageDropdownComponent } from './components/language-dropdown/language-dropdown.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { PublishForumComponent } from './components/publish-forum/publish-forum.component';
import { LimitBannerComponent } from './components/limit-banner/limit-banner.component';

@NgModule({
    declarations: [
        CoffeeLabComponent,
        CoffeeRecipesViewComponent,
        RecipeDetailComponent,
        QaForumViewComponent,
        QuestionDetailComponent,
        ArticlesViewComponent,
        ArticleDetailComponent,
        TranslationDropdownComponent,
        ForumCardComponent,
        BottomBannerComponent,
        SearchForumComponent,
        JsonLdComponent,
        UserDetailComponent,
        UserHeaderComponent,
        EraOfWeComponent,
        JoinCommunityComponent,
        ForumMenuComponent,
        QuestionsComponent,
        OverviewComponent,
        LanguageDropdownComponent,
        SignupModalComponent,
        PublishForumComponent,
        LimitBannerComponent,
    ],
    imports: [CommonModule, CoffeLabRoutingModule, SharedModule],
})
export class CoffeeLabModule {}
