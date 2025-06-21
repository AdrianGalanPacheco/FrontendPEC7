import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleNewReactiveComponent } from './article-new-reactive/article-new-reactive.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleDetailComponent,
    ArticleNewReactiveComponent,
  ],
  imports: [CommonModule, ArticleRoutingModule, ReactiveFormsModule],
})
export class ArticleModule {}
