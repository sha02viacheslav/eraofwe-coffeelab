import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from './footer.component';

@NgModule({
    declarations: [FooterComponent],
    exports: [FooterComponent],
    imports: [CommonModule, AccordionModule, FormsModule, CarouselModule, SharedModule, ToastModule],
})
export class FooterModule {}
