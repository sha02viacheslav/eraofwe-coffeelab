import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LanguageDropdownModule } from '@modules/coffee-lab/components/language-dropdown/language-dropdown.module';
import { SharedModule } from '@shared';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [CommonModule, SharedModule, LanguageDropdownModule],
})
export class HeaderModule {}
