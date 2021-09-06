import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QaForumViewRoutingModule } from './qa-forum-view-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@app/modules/coffee-lab/components/coffee-lab-components.module';

import { QaForumViewComponent } from './qa-forum-view.component';

@NgModule({
    declarations: [QaForumViewComponent],
    imports: [CommonModule, QaForumViewRoutingModule, SharedModule, CoffeeLabComponentsModule],
})
export class QaForumViewModule {}
