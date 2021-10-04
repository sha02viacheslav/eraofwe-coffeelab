import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QaForumViewRoutingModule } from './qa-forum-view-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@modules/coffee-lab/components/coffee-lab-components.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';

import { QaForumViewComponent } from './qa-forum-view.component';

@NgModule({
    declarations: [QaForumViewComponent],
    imports: [CommonModule, QaForumViewRoutingModule, SharedModule, CoffeeLabComponentsModule, UserHeaderModule],
})
export class QaForumViewModule {}
