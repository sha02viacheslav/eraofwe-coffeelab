import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { SharedModule } from '@shared';

import { TabMenuModule } from 'primeng/tabmenu';

import { OverviewComponent } from './overview.component';
import { LanguageDropdownComponent } from '../../components/language-dropdown/language-dropdown.component';
import { SearchForumComponent } from '../../components/search-forum/search-forum.component';

@NgModule({
    declarations: [OverviewComponent, LanguageDropdownComponent, SearchForumComponent],
    imports: [CommonModule, OverviewRoutingModule, SharedModule, TabMenuModule],
})
export class OverviewModule {}
