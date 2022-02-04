import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleCardModule } from '@modules/coffee-lab/components/article-card/article-card.module';
import { CategoryListModule } from '@modules/coffee-lab/components/category-list/category-list.module';
import { RecipeCardModule } from '@modules/coffee-lab/components/recipe-card/recipe-card.module';
import { UserHeaderModule } from '@modules/coffee-lab/components/user-header/user-header.module';
import { SharedModule } from '@shared';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
    declarations: [LandingPageComponent],
    imports: [
        CommonModule,
        LandingPageRoutingModule,
        AccordionModule,
        CarouselModule,
        TabViewModule,
        SharedModule,
        FooterModule,
        UserHeaderModule,
        ArticleCardModule,
        RecipeCardModule,
        CategoryListModule,
        HeaderModule,
    ],
})
export class LandingPageModule {}
