import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';

// Names validator
function NameArticleValidator(
  control: AbstractControl
): ValidationErrors | null {
  const forbiddenNames = ['prueba', 'test', 'mock', 'fake'];
  const value = control.value?.toLowerCase();

  if (value && forbiddenNames.includes(value)) {
    return { forbiddenName: { value: control.value } };
  }
  return null;
}

@Component({
  selector: 'app-article-new-reactive',
  templateUrl: './article-new-reactive.component.html',
  styleUrls: ['./article-new-reactive.component.css'],
})
export class ArticleNewReactiveComponent {
  articleForm: FormGroup;
  submitted = false;

  private urlPattern =
    /^https?:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,3}\/[a-zA-Z0-9\-\.]+(\.[a-zA-Z]{2,4})$/i;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.createForm();
  }

  createForm() {
    this.articleForm = this.fb.group({
      name: ['', [Validators.required, NameArticleValidator]],
      price: ['', [Validators.required, Validators.min(0.1)]],
      imageUrl: [
        '',
        [Validators.required, Validators.pattern(this.urlPattern)],
      ],
      isOnSale: [false],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.articleForm.invalid) {
      console.log('Hay campos sin rellenar');
    } else {
      const article: Article = this.articleForm.value;
      // Creates the observable and subscribes to it to create the article
      this.articleService.create(article).subscribe((newArticle) => {
        console.log(newArticle);
        this.submitted = false;
        this.articleForm.reset();
      });
    }
  }
}
