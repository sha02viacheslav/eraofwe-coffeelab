import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JoinCommunityModule } from '@modules/coffee-lab/components/join-community/join-community.module';
import { SeoPaginatorModule } from '@modules/coffee-lab/components/paginator/paginator.module';
import { SharedModule } from '@shared';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { QuestionsModule } from '../../../components/questions/questions.module';
import { QaForumViewRoutingModule } from './qa-forum-view-routing.module';
import { QaForumViewComponent } from './qa-forum-view.component';

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
