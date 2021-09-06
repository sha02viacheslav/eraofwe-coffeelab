import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesViewComponent } from './articles-view.component';

const routes: Routes = [
    {
        path: '',
        component: ArticlesViewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ArticlesViewRoutingModule {}
