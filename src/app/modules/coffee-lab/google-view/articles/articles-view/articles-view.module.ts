import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesViewRoutingModule } from './articles-view-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@app/modules/coffee-lab/components/coffee-lab-components.module';

import { ArticlesViewComponent } from './articles-view.component';

@NgModule({
    declarations: [ArticlesViewComponent],
    imports: [CommonModule, ArticlesViewRoutingModule, SharedModule, CoffeeLabComponentsModule],
})
export class ArticlesViewModule {}
