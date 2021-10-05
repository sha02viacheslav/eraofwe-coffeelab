import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverviewRoutingModule } from './overview-routing.module';
import { SharedModule } from '@shared';
import { SignupModalModule } from '@modules/coffee-lab/components/signup-modal/signup-modal.module';
import { PublishForumModule } from '@modules/coffee-lab/components/publish-forum/publish-forum.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { TabMenuModule } from 'primeng/tabmenu';

import { OverviewComponent } from './overview.component';
import { LanguageDropdownComponent } from '../../components/language-dropdown/language-dropdown.component';
import { SearchForumComponent } from '../../components/search-forum/search-forum.component';

@NgModule({
    declarations: [OverviewComponent, LanguageDropdownComponent, SearchForumComponent],
    imports: [
        CommonModule,
        FormsModule,
        OverviewRoutingModule,
        SharedModule,
        TabMenuModule,
        SignupModalModule,
        PublishForumModule,
        InputTextModule,
        DropdownModule,
    ],
})
export class OverviewModule {}
