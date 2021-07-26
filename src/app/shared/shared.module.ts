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

import { GalleryModule } from 'ng-gallery';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MomentModule } from 'ngx-moment';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TranslateModule } from '@ngx-translate/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const THIRDMODULES = [
    CarouselModule,
    DividerModule,
    DropdownModule,
    DynamicDialogModule,
    GalleryModule,
    InputTextModule,
    LazyLoadImageModule,
    LightboxModule,
    MenuModule,
    ModalModule,
    MomentModule,
    OverlayPanelModule,
    PaginatorModule,
    PopoverModule,
    SkeletonModule,
    TabMenuModule,
    TranslateModule,
    TypeaheadModule,
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
