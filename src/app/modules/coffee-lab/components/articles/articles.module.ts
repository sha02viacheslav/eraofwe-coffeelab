import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ArticleCardModule } from '../article-card/article-card.module';
import { SeoPaginatorModule } from '../paginator/paginator.module';
import { ArticlesComponent } from './articles.component';

@NgModule({
    declarations: [ArticlesComponent],
    exports: [ArticlesComponent],
    imports: [CommonModule, SharedModule, SeoPaginatorModule, ArticleCardModule],
})
export class ArticlesModule {}
