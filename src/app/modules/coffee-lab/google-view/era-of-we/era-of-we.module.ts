import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EraOfWeRoutingModule } from './era-of-we-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { PublishForumModule } from '@modules/coffee-lab/components/publish-forum/publish-forum.module';

import { EraOfWeComponent } from './era-of-we.component';

@NgModule({
    declarations: [EraOfWeComponent],
    imports: [CommonModule, EraOfWeRoutingModule, SharedModule, UserHeaderModule, PublishForumModule],
})
export class EraOfWeModule {}
