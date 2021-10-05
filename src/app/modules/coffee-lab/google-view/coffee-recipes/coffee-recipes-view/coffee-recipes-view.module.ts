import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeRecipesViewRoutingModule } from './coffee-recipes-view-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { SeoPaginatorModule } from '@modules/coffee-lab/components/paginator/paginator.module';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { CoffeeRecipesViewComponent } from './coffee-recipes-view.component';

@NgModule({
    declarations: [CoffeeRecipesViewComponent],
    imports: [
        CommonModule,
        CoffeeRecipesViewRoutingModule,
        SharedModule,
        UserHeaderModule,
        SeoPaginatorModule,
        NgxJsonLdModule,
        InputTextModule,
        DropdownModule,
    ],
})
export class CoffeeRecipesViewModule {}
