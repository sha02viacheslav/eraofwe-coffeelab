import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../error-module/page-not-found/page-not-found.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { NoInternetConnectionComponent } from './no-internet-connection/no-internet-connection.component';
import { PostNotFoundComponent } from './post-not-found/post-not-found.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'internal-server-error',
                component: InternalServerErrorComponent,
            },
            {
                path: 'network-connection-error',
                component: NoInternetConnectionComponent,
            },
            {
                path: 'post-not-found',
                component: PostNotFoundComponent,
            },
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorModuleRoutingModule {}
