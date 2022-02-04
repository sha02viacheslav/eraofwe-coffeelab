import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { JoinCommunityModule } from '../join-community/join-community.module';
import { PopularPostsComponent } from './popular-posts.component';

@NgModule({
    declarations: [PopularPostsComponent],
    exports: [PopularPostsComponent],
    imports: [CommonModule, SharedModule, JoinCommunityModule],
})
export class PopularPostsModule {}
