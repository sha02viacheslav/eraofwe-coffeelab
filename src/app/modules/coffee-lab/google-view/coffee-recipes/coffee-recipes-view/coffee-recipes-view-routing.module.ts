import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoffeeRecipesViewComponent } from './coffee-recipes-view.component';

const routes: Routes = [
    {
        path: '',
        component: CoffeeRecipesViewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoffeeRecipesViewRoutingModule {}
