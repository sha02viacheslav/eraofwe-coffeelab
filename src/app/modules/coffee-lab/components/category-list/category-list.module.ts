import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { CategoryListComponent } from './category-list.component';

@NgModule({
    declarations: [CategoryListComponent],
    exports: [CategoryListComponent],
    imports: [CommonModule, SharedModule],
})
export class CategoryListModule {}
