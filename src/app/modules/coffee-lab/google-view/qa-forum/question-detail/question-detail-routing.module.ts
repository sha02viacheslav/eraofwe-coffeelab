import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionDetailComponent } from './question-detail.component';

const routes: Routes = [
    {
        path: '',
        component: QuestionDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuestionDetailRoutingModule {}
