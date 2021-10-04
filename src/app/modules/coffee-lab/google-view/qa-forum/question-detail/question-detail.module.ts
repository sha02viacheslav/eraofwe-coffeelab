import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDetailRoutingModule } from './question-detail-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponentsModule } from '@modules/coffee-lab/components/coffee-lab-components.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { TranslationDropdownModule } from '@modules/coffee-lab/components/translation-dropdown/translation-dropdown.module';

import { QuestionDetailComponent } from './question-detail.component';

@NgModule({
    declarations: [QuestionDetailComponent],
    imports: [
        CommonModule,
        QuestionDetailRoutingModule,
        SharedModule,
        CoffeeLabComponentsModule,
        UserHeaderModule,
        TranslationDropdownModule,
    ],
})
export class QuestionDetailModule {}
