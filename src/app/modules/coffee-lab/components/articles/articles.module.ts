import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { ArticlesComponent } from './articles.component';
import { ForumMenuModule } from '../forum-menu/forum-menu.module';
import { SeoPaginatorModule } from '../paginator/paginator.module';
import { UserHeaderModule } from '../user-header/user-header.module';

@NgModule({
    declarations: [ArticlesComponent],
    exports: [ArticlesComponent],
    imports: [CommonModule, SharedModule, ForumMenuModule, SeoPaginatorModule, UserHeaderModule],
})
export class ArticlesModule {}
