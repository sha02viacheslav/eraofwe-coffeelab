import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { SharedModule } from '@shared';
import { ArticleCardComponent } from './article-card.component';

@NgModule({
    declarations: [ArticleCardComponent],
    exports: [ArticleCardComponent],
    imports: [CommonModule, SharedModule, UserHeaderModule, ForumMenuModule],
})
export class ArticleCardModule {}
