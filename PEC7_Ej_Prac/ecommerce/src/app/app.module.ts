import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleItemComponent } from './article/article-item/article-item.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ArticleNewTemplateComponent } from './article/article-new-template/article-new-template.component';
import { ArticleNewReactiveComponent } from './article/article-new-reactive/article-new-reactive.component';
import { HttpClientModule } from '@angular/common/http';
import { DefaultImagePipe } from './shared/pipe/default-image.pipe';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleAppInterceptor } from './shared/interceptors/article-app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ArticleItemComponent,
    ArticleListComponent,
    NavbarComponent,
    ArticleNewTemplateComponent,
    DefaultImagePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      // HTTP Interceptor
      provide: HTTP_INTERCEPTORS,
      useClass: ArticleAppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
