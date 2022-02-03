import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { CoffeLabRoutingModule } from './coffee-lab-routing.module';
import { CoffeeLabComponent } from './coffee-lab.component';
import { LanguageDropdownModule } from './components/language-dropdown/language-dropdown.module';

@NgModule({
    declarations: [CoffeeLabComponent],
    imports: [CommonModule, CoffeLabRoutingModule, SharedModule, FooterModule, LanguageDropdownModule],
})
export class CoffeeLabModule {}
