import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { ErrorModuleRoutingModule } from './error-module-routing.module';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { NoInternetConnectionComponent } from './no-internet-connection/no-internet-connection.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostNotFoundComponent } from './post-not-found/post-not-found.component';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        NoInternetConnectionComponent,
        InternalServerErrorComponent,
        PostNotFoundComponent,
    ],
    imports: [CommonModule, ErrorModuleRoutingModule, FooterModule, HeaderModule],
})
export class ErrorModuleModule {}
