import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostType } from '@enums';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { CategoryComponent } from './category.component';

const routes: Routes = [
    {
        path: '',
        component: CategoryComponent,
        children: [
            {
                path: '',
                redirectTo: 'qa-forum',
                pathMatch: 'full',
            },
            {
                path: 'qa-forum',
                component: CategoryPostsComponent,
                data: { postType: PostType.QA },
            },
            {
                path: 'articles',
                component: CategoryPostsComponent,
                data: { postType: PostType.ARTICLE },
            },
            {
                path: 'coffee-recipes',
                component: CategoryPostsComponent,
                data: { postType: PostType.RECIPE },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryRoutingModule {}
