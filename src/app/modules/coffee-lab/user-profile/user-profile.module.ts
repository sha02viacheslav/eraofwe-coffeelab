import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '@shared';

import { UserProfileComponent } from './user-profile.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { ProfileCertificatesViewComponent } from './profile-certificates-view/profile-certificates-view.component';
import { SeoPaginatorModule } from '../components/paginator/paginator.module';
import { QuestionsCardModule } from '../components/question-card/question-card.module';
import { ArticleCardModule } from '../components/article-card/article-card.module';
import { RecipeCardModule } from '../components/recipe-card/recipe-card.module';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
    declarations: [UserProfileComponent, ProfileCertificatesViewComponent, UserPostsComponent],
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        SharedModule,
        SeoPaginatorModule,
        QuestionsCardModule,
        ArticleCardModule,
        RecipeCardModule,
        TabViewModule,
        PaginatorModule,
    ],
})
export class UserProfileModule {}
