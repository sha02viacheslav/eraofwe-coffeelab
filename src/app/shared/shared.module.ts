import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';
import { NgxJsonLdModule } from 'ngx-json-ld';

const THIRDMODULES = [DropdownModule, InputTextModule, LazyLoadImageModule, NgxJsonLdModule, TranslateModule];
// #endregion

import { LoadingComponent } from './components/loading/loading.component';

const COMPONENTS = [LoadingComponent];

const DIRECTIVES = [];

import { ConvertToShortDescriptionPipe, CountryPipe, DateAgoReplacePipe, LanguagePipe, AmTimeAgoPipe } from './pipes';

const PIPES = [ConvertToShortDescriptionPipe, CountryPipe, DateAgoReplacePipe, LanguagePipe, AmTimeAgoPipe];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, ...THIRDMODULES],
    declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],

    exports: [CommonModule, FormsModule, RouterModule, ...THIRDMODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {}
