import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';

import { TranslateModule } from '@ngx-translate/core';

import { FileIconPipe } from './pipes/file-icon.pipe';
import { FileNamePipe } from './pipes/file-name.pipe';
import { MonthPipe } from './pipes/month/month.pipe';
import { WordCountPipe } from './pipes/word-count/word-count.pipe';
import { ArrayFilterPipe } from './pipes/array-filter.pipe';
import { StringReplacePipe } from './pipes/string-replace.pipe';

import { WordLimitDirective } from './directives/word-limit.directive';

import { AvatarComponent } from './components/avatar/avatar.component';
import { BlankComponent } from './components/blank/blank.component';
import { EmptyComponent } from './components/empty/empty.component';
import { MediaComponent } from './components/media/media.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { LoadingComponent } from './components/loading/loading.component';

// #region third libs
const THIRDMODULES = [
    ModalModule,
    PopoverModule,
    TypeaheadModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CheckboxModule,
    DialogModule,
    ChipsModule,
    DropdownModule,
    DynamicDialogModule,
    GalleriaModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    MenuModule,
    MultiSelectModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    SliderModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TooltipModule,
    TreeModule,
    TranslateModule,
    ProgressBarModule,
    AccordionModule,
    DividerModule,
];
// #endregion

// #region your componets & directives
const COMPONENTS = [
    AvatarComponent,
    BlankComponent,
    EmptyComponent,
    BlankComponent,
    MediaComponent,
    VideoPlayerComponent,
    ReadMoreComponent,
    LoadingComponent,
];

const DIRECTIVES = [WordLimitDirective];
const PIPES = [ArrayFilterPipe, FileIconPipe, FileNamePipe, MonthPipe, StringReplacePipe, WordCountPipe];
// #endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        // third libs
        ...THIRDMODULES,
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
    ],

    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
    ],
    providers: [DialogService],
})
export class SharedModule {}
