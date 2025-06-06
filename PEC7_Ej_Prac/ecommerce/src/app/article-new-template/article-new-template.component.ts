import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from '../models/article';

@Component({
  selector: 'app-article-new-template',
  templateUrl: './article-new-template.component.html',
  styleUrls: ['./article-new-template.component.css'],
})
export class ArticleNewTemplateComponent {
  constructor() {}

  onSubmit(articleForm) {
    if(articleForm.invalid) {
      console.log('Hay campos sin rellenar');
    } else {
      const article: Article = articleForm.value.article;
      console.log(article);
    }
  }
}