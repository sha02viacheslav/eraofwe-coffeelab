import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageDropdownComponent } from '@modules/coffee-lab/components/language-dropdown/language-dropdown.component';
import { SharedModule } from '@shared';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [LanguageDropdownComponent],
    exports: [LanguageDropdownComponent],
    imports: [CommonModule, SharedModule, DropdownModule, FormsModule],
})
export class LanguageDropdownModule {}
