import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { SeoPaginatorModule } from '../paginator/paginator.module';
import { UserHeaderModule } from '../user-header/user-header.module';
import { RecipeCardComponent } from './recipe-card.component';

@NgModule({
    declarations: [RecipeCardComponent],
    exports: [RecipeCardComponent],
    imports: [CommonModule, SharedModule, SeoPaginatorModule, UserHeaderModule],
})
export class RecipeCardModule {}
