import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';

const THIRDMODULES = [
    DividerModule,
    DropdownModule,
    DynamicDialogModule,
    InputTextModule,
    LazyLoadImageModule,
    MenuModule,
    OverlayPanelModule,
    PaginatorModule,
    SkeletonModule,
    TranslateModule,
];
// #endregion

import { LoadingComponent } from './components/loading/loading.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

const COMPONENTS = [LoadingComponent, PaginatorComponent];

const DIRECTIVES = [];

import { ConvertToShortDescriptionPipe, CountryPipe, DateAgoReplacePipe, LanguagePipe, AmTimeAgoPipe } from './pipes';

const PIPES = [ConvertToShortDescriptionPipe, CountryPipe, DateAgoReplacePipe, LanguagePipe, AmTimeAgoPipe];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, ...THIRDMODULES],
    declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],

    exports: [CommonModule, FormsModule, RouterModule, ...THIRDMODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
    providers: [DialogService],
})
export class SharedModule {}
