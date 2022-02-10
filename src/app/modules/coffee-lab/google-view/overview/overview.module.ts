import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageDropdownModule } from '@modules/coffee-lab/components/language-dropdown/language-dropdown.module';
import { PublishForumModule } from '@modules/coffee-lab/components/publish-forum/publish-forum.module';
import { SignupModalModule } from '@modules/coffee-lab/components/signup-modal/signup-modal.module';
import { SharedModule } from '@shared';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { SearchForumComponent } from '../../components/search-forum/search-forum.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';

@NgModule({
    declarations: [OverviewComponent, SearchForumComponent],
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
        LanguageDropdownModule,
    ],
})
export class OverviewModule {}
