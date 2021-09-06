import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDetailRoutingModule } from './question-detail-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@app/modules/coffee-lab/components/coffee-lab-components.module';

import { QuestionDetailComponent } from './question-detail.component';

@NgModule({
    declarations: [QuestionDetailComponent],
    imports: [CommonModule, QuestionDetailRoutingModule, SharedModule, CoffeeLabComponentsModule],
})
export class QuestionDetailModule {}
