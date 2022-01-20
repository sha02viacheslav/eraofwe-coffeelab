import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SeoPaginatorModule } from '../paginator/paginator.module';
import { QuestionsCardModule } from '../question-card/question-card.module';
import { RectangleAdsModule } from '../rectangle-ads/rectangle-ads.module';
import { QuestionsComponent } from './questions.component';

@NgModule({
    declarations: [QuestionsComponent],
    exports: [QuestionsComponent],
    imports: [CommonModule, SharedModule, SeoPaginatorModule, QuestionsCardModule, RectangleAdsModule],
})
export class QuestionsModule {}
