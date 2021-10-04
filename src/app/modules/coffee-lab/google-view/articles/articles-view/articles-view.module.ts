import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesViewRoutingModule } from './articles-view-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { PublishForumModule } from '@modules/coffee-lab/components/publish-forum/publish-forum.module';
import { SeoPaginatorModule } from '@modules/coffee-lab/components/paginator/paginator.module';

import { ArticlesViewComponent } from './articles-view.component';

@NgModule({
    declarations: [ArticlesViewComponent],
    imports: [
        CommonModule,
        ArticlesViewRoutingModule,
        SharedModule,
        UserHeaderModule,
        PublishForumModule,
        SeoPaginatorModule,
    ],
})
export class ArticlesViewModule {}
