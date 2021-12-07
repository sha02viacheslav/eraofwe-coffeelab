import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QaForumViewRoutingModule } from './qa-forum-view-routing.module';
import { SharedModule } from '@shared';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { QaForumViewComponent } from './qa-forum-view.component';
import { SeoPaginatorModule } from '@modules/coffee-lab/components/paginator/paginator.module';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { QuestionsModule } from '../../../components/questions/questions.module';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';

@NgModule({
    declarations: [QaForumViewComponent],
    imports: [
        CommonModule,
        FormsModule,
        QaForumViewRoutingModule,
        SharedModule,
        InputTextModule,
        DropdownModule,
        MultiSelectModule,
        SeoPaginatorModule,
        JoinCommunityModule,
        NgxJsonLdModule,
        QuestionsModule,
    ],
})
export class QaForumViewModule {}
