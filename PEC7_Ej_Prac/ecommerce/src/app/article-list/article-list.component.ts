import { Component } from '@angular/core';
import { Article } from '../models/article';
import { ArticleQuantityChange } from '../models/article-quantity-change';
import { Observable, Subject, switchMap, startWith } from 'rxjs';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-list',
  template: `
    <div class="container mt-4">
      <h1 class="text-center mb-4">Lista de artículos</h1>
      <!-- Input field -->
      <div class="mb-4 d-flex justify-content-center">
        <input
          type="text"
          (input)="onFilterChange($event.target.value)"
          placeholder="Search article..."
          class="form-control w-50"
          style="max-width: 400px;"
        />
      </div>
      <div class="row">
        <!-- async pipe to subscribe to the articles observable -->
        <div class="col-md-4 mb-3" *ngFor="let article of articles$ | async">
          <app-article-item
            [article]="article"
            (quantityChange)="onQuantityChange($event)"
          ></app-article-item>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ArticleListComponent {
  /*
  // Exercise 2
  // New observable
  articles$: Observable<Article[]>;

  // Injecting the ArticleService
  constructor(private articleService: ArticleService) {
    this.articles$ = this.articleService.getArticles();
  }

  // Handles the quantity change event and subscribes to update the article
  onQuantityChange(change: ArticleQuantityChange) {
    this.articleService
      .changeQuantity(change.article.id, change.quantityChange)
      .subscribe();
  }
  */

  // Exercise 4
  // Emits strings when user introduces something new
  filter$ = new Subject<string>();
  articles$: Observable<Article[]>;
  currentFilter = '';

  // Service injection
  constructor(private articleService: ArticleService) {
    // Use of pipe to transform and manage filter emitted values.
    this.articles$ = this.filter$.pipe(
      // Emit empty value to get all the articles
      startWith(''),
      // Every time filter emits a new value, cancel previous requests, calls the API and emit the new value of article
      switchMap((filter) => this.articleService.getArticles(filter))
    );
  }

  onQuantityChange(change: ArticleQuantityChange) {
    this.articleService
      .changeQuantity(change.article.id, change.quantityChange)
      .subscribe(() => {
        // Updates the article list
        this.filter$.next(this.currentFilter || '');
      });
  }

  // Emits the introduced string to all the Subjects and Observables
  onFilterChange(text: string) {
    this.currentFilter = text;
    this.filter$.next(text);
  }
}
