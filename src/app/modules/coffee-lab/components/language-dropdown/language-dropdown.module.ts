import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { DropdownModule } from 'primeng/dropdown';
import { LanguageDropdownComponent } from '@modules/coffee-lab/components/language-dropdown/language-dropdown.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [LanguageDropdownComponent],
    exports: [LanguageDropdownComponent],
    imports: [CommonModule, SharedModule, DropdownModule, FormsModule],
})
export class LanguageDropdownModule {}
