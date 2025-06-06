import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
})
export class ArticleDetailComponent {
  articleId!: number;
  article: Article | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    // Get the ID from the URL
    this.articleId = +this.route.snapshot.paramMap.get('id')!;

    // Call the service to get the article by ID
    this.articleService.getArticleById(this.articleId).subscribe((article) => {
      this.article = article;
    });
  }
}
