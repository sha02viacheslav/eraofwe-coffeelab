import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { QuestionsComponent } from './questions.component';
import { SeoPaginatorModule } from '../paginator/paginator.module';
import { QuestionsCardModule } from '../question-card/question-card.module';

@NgModule({
    declarations: [QuestionsComponent],
    exports: [QuestionsComponent],
    imports: [CommonModule, SharedModule, SeoPaginatorModule, QuestionsCardModule],
})
export class QuestionsModule {}
