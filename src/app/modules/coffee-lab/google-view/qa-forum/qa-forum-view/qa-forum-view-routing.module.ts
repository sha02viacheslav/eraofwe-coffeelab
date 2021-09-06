import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QaForumViewComponent } from './qa-forum-view.component';

const routes: Routes = [
    {
        path: '',
        component: QaForumViewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QaForumViewRoutingModule {}
