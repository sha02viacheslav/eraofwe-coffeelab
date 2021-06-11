import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorModuleRoutingModule } from './error-module-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NoInternetConnectionComponent } from './no-internet-connection/no-internet-connection.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [PageNotFoundComponent, NoInternetConnectionComponent, InternalServerErrorComponent],
  imports: [
    CommonModule,
    ErrorModuleRoutingModule,
    RouterModule
  ]
})
export class ErrorModuleModule { }
