import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@modules/coffee-lab/components/coffee-lab-components.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { TranslationDropdownModule } from '@modules/coffee-lab/components/translation-dropdown/translation-dropdown.module';

import { ArticleDetailComponent } from './article-detail.component';

@NgModule({
    declarations: [ArticleDetailComponent],
    imports: [
        CommonModule,
        ArticleDetailRoutingModule,
        SharedModule,
        CoffeeLabComponentsModule,
        UserHeaderModule,
        TranslationDropdownModule,
    ],
})
export class ArticleDetailModule {}
