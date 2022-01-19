import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleCardModule } from '@modules/coffee-lab/components/article-card/article-card.module';
import { QuestionsCardModule } from '@modules/coffee-lab/components/question-card/question-card.module';
import { RecipeCardModule } from '@modules/coffee-lab/components/recipe-card/recipe-card.module';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
    declarations: [LandingPageComponent],
    imports: [
        CommonModule,
        LandingPageRoutingModule,
        AccordionModule,
        CarouselModule,
        FooterModule,
        QuestionsCardModule,
        ArticleCardModule,
        RecipeCardModule,
        TabViewModule,
    ],
})
export class LandingPageModule {}
