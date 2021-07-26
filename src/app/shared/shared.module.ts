import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';

import { GalleryModule } from 'ng-gallery';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MomentModule } from 'ngx-moment';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TranslateModule } from '@ngx-translate/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const THIRDMODULES = [
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CheckboxModule,
    ChipsModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    DynamicDialogModule,
    GalleriaModule,
    GalleryModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    LazyLoadImageModule,
    LightboxModule,
    MenuModule,
    ModalModule,
    MomentModule,
    MultiSelectModule,
    OverlayPanelModule,
    PaginatorModule,
    PopoverModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    SkeletonModule,
    SliderModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TooltipModule,
    TranslateModule,
    TreeModule,
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
