import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@app/modules/coffee-lab/components/coffee-lab-components.module';

import { ArticleDetailComponent } from './article-detail.component';

@NgModule({
    declarations: [ArticleDetailComponent],
    imports: [CommonModule, ArticleDetailRoutingModule, SharedModule, CoffeeLabComponentsModule],
})
export class ArticleDetailModule {}
