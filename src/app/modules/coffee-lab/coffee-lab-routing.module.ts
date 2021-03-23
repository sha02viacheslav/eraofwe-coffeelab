import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoffeeLabComponent } from './coffee-lab.component';
import { QaViewComponent } from './google-view/qa-view/qa-view.component';
import { RecipeViewComponent } from './google-view/recipe-view/recipe-view.component';

const routes: Routes = [
    {
        path: '',
        component: CoffeeLabComponent,
        children: [
            {
                path: 'qa',
                component: QaViewComponent,
            },
            {
                path: 'recipe',
                component: RecipeViewComponent,
            },
            {
                path: '',
                redirectTo: 'recipe',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoffeLabRoutingModule {}
