import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ToastModule } from 'primeng/toast';
import { TranslateToastComponent } from './translate-toast.component';

@NgModule({
    declarations: [TranslateToastComponent],
    exports: [TranslateToastComponent],
    imports: [CommonModule, SharedModule, ToastModule],
})
export class TranslateTostModule {}
