import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { SignupModalModule } from '../signup-modal/signup-modal.module';
import { InputTextModule } from 'primeng/inputtext';

import { PublishForumComponent } from './publish-forum.component';

@NgModule({
    declarations: [PublishForumComponent],
    exports: [PublishForumComponent],
    imports: [CommonModule, SharedModule, SignupModalModule, InputTextModule],
})
export class PublishForumModule {}
