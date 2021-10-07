import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';

const THIRDMODULES = [LazyLoadImageModule, TranslateModule];

import { LoadingComponent } from './components/loading/loading.component';

const COMPONENTS = [LoadingComponent];

const DIRECTIVES = [];

import { ConvertToShortDescriptionPipe, CountryPipe, DateAgoReplacePipe, LanguagePipe, AmTimeAgoPipe } from './pipes';
import { OrgTypePipe } from './pipes/org-type.pipe';

const PIPES = [
    ConvertToShortDescriptionPipe,
    CountryPipe,
    DateAgoReplacePipe,
    LanguagePipe,
    OrgTypePipe,
    AmTimeAgoPipe,
];

@NgModule({
    imports: [CommonModule, RouterModule, ...THIRDMODULES],
    declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
    exports: [CommonModule, RouterModule, ...THIRDMODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {}
