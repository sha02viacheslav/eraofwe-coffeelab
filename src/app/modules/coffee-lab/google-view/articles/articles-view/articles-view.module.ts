import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ArticlesViewRoutingModule } from './articles-view-routing.module';
import { SharedModule } from '@shared';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { SeoPaginatorModule } from '@modules/coffee-lab/components/paginator/paginator.module';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { ArticlesViewComponent } from './articles-view.component';

@NgModule({
    declarations: [ArticlesViewComponent],
    imports: [
        CommonModule,
        FormsModule,
        ArticlesViewRoutingModule,
        SharedModule,
        UserHeaderModule,
        SeoPaginatorModule,
        NgxJsonLdModule,
        InputTextModule,
        DropdownModule,
    ],
})
export class ArticlesViewModule {}
