import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { ForumMenuModule } from '@modules/coffee-lab/components/forum-menu/forum-menu.module';
import { ArticleCardComponent } from './article-card.component';

@NgModule({
    declarations: [ArticleCardComponent],
    exports: [ArticleCardComponent],
    imports: [CommonModule, SharedModule, UserHeaderModule, ForumMenuModule],
})
export class ArticleCardModule {}
