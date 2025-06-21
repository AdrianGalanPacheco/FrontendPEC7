import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleNewReactiveComponent } from './article-new-reactive/article-new-reactive.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  // Article list
  { path: 'list', component: ArticleListComponent },
  // Create article -> Access if guard returns true
  {
    path: 'create',
    component: ArticleNewReactiveComponent,
    canActivate: [authGuard],
  },
  // Article details
  { path: ':id', component: ArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
