import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeRecipesViewRoutingModule } from './coffee-recipes-view-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { PublishForumModule } from '@modules/coffee-lab/components/publish-forum/publish-forum.module';
import { SeoPaginatorModule } from '@modules/coffee-lab/components/paginator/paginator.module';

import { CoffeeRecipesViewComponent } from './coffee-recipes-view.component';

@NgModule({
    declarations: [CoffeeRecipesViewComponent],
    imports: [
        CommonModule,
        CoffeeRecipesViewRoutingModule,
        SharedModule,
        UserHeaderModule,
        PublishForumModule,
        SeoPaginatorModule,
    ],
})
export class CoffeeRecipesViewModule {}
