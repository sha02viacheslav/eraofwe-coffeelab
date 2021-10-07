import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { ArticlesComponent } from './articles.component';
import { SeoPaginatorModule } from '../paginator/paginator.module';
import { ArticleCardModule } from '../article-card/article-card.module';

@NgModule({
    declarations: [ArticlesComponent],
    exports: [ArticlesComponent],
    imports: [CommonModule, SharedModule, SeoPaginatorModule, ArticleCardModule],
})
export class ArticlesModule {}
