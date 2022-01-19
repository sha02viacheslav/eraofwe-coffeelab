import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { FooterComponent } from './footer.component';

@NgModule({
    declarations: [FooterComponent],
    exports: [FooterComponent],
    imports: [CommonModule, AccordionModule, CarouselModule, SharedModule],
})
export class FooterModule {}
