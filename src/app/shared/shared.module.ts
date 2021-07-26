import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TabMenuModule } from 'primeng/tabmenu';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';

const THIRDMODULES = [
    CarouselModule,
    DividerModule,
    DropdownModule,
    DynamicDialogModule,
    InputTextModule,
    LazyLoadImageModule,
    MenuModule,
    MomentModule,
    OverlayPanelModule,
    PaginatorModule,
    SkeletonModule,
    TabMenuModule,
    TranslateModule,
];
// #endregion

import { AvatarComponent } from './components/avatar/avatar.component';
import { LoadingComponent } from './components/loading/loading.component';

const COMPONENTS = [AvatarComponent, LoadingComponent];

const DIRECTIVES = [];

import { ConvertToShortDescriptionPipe } from './pipes/convert-to-short-description.pipe';
import { DateAgoReplacePipe } from './pipes/date-ago-replace.pipe';

const PIPES = [ConvertToShortDescriptionPipe, DateAgoReplacePipe];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...THIRDMODULES],
    declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],

    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...THIRDMODULES,
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
    ],
    providers: [DialogService],
})
export class SharedModule {}
