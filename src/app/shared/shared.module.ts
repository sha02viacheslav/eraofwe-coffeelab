import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AdsComponent } from './components/ads/ads.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RectangleAdsComponent } from './components/rectangle-ads/rectangle-ads.component';
import { RedirectPopupComponent } from './components/redirect-popup/redirect-popup.component';
import { SquareAdsComponent } from './components/square-ads/square-ads.component';
import { AmTimeAgoPipe, ConvertToShortDescriptionPipe, CountryPipe, DateAgoReplacePipe, LanguagePipe } from './pipes';
import { OrgTypePipe } from './pipes/org-type.pipe';

const THIRDMODULES = [LazyLoadImageModule, TranslateModule];

const COMPONENTS = [LoadingComponent, SquareAdsComponent, RectangleAdsComponent, AdsComponent, RedirectPopupComponent];

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
