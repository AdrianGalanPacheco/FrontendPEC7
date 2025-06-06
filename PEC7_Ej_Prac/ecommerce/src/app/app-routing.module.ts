import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleNewReactiveComponent } from './article-new-reactive/article-new-reactive.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  // Login
  { path: 'login', component: LoginComponent },
  // Register
  { path: 'register', component: RegisterComponent },
  // Article list
  { path: 'article/list', component: ArticleListComponent },
  // Create article -> Access if guard returns true
  {
    path: 'article/create',
    component: ArticleNewReactiveComponent,
    canActivate: [authGuard],
  },
  // Article details
  { path: 'article/:id', component: ArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
