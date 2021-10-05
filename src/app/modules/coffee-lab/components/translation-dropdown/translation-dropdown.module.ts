import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { UserDetailModule } from '../user-detail/user-detail.module';
import { DropdownModule } from 'primeng/dropdown';

import { TranslationDropdownComponent } from './translation-dropdown.component';

@NgModule({
    declarations: [TranslationDropdownComponent],
    exports: [TranslationDropdownComponent],
    imports: [CommonModule, SharedModule, UserDetailModule, DropdownModule],
})
export class TranslationDropdownModule {}
