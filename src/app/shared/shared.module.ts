import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { EmptyComponent } from './components/empty/empty.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AmTimeAgoPipe, ConvertToShortDescriptionPipe, CountryPipe, DateAgoReplacePipe, LanguagePipe } from './pipes';
import { OrgTypePipe } from './pipes/org-type.pipe';

const THIRDMODULES = [LazyLoadImageModule, TranslateModule];

const COMPONENTS = [LoadingComponent, EmptyComponent];

const DIRECTIVES = [];

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
