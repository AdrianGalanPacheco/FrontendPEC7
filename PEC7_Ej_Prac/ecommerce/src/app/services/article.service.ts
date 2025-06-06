import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  /*
  // EXERCISE 2
  // BehaviourSubject observable to store the articles
  private articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>(
    [
      {
        id: 1,
        name: 'Chaqueta',
        imageUrl:
          'https://w7.pngwing.com/pngs/659/426/png-transparent-jacket-duffel-coat-hood-blue-jacket.png',
        price: 109.99,
        isOnSale: true,
        quantityInCart: 0,
      },
      {
        id: 2,
        name: 'Camiseta',
        imageUrl:
          'https://img.freepik.com/psd-premium/t-shirt-negro-filmado-estudio-sobre-fondo-blanco_1153121-10726.jpg',
        price: 9.99,
        isOnSale: true,
        quantityInCart: 0,
      },
      {
        id: 3,
        name: 'Pantalones',
        imageUrl:
          'https://static.vecteezy.com/system/resources/thumbnails/044/812/684/small_2x/a-one-classic-blue-jeans-isolated-on-transparent-background-png.png',
        price: 29.99,
        isOnSale: false,
        quantityInCart: 0,
      },
    ]
  );
  */
  /*
  // Returns an observable of articles
  getArticles(): Observable<Article[]> {
    return this.articles.asObservable();
  }

  // Returns an observable that emits the modified article
  changeQuantity(
    articleID: number,
    changeInQuantity: number
  ): Observable<Article> {
    // Finds the article and updates its quantity
    const updated = this.articles.value.map((a) => {
      if (a.id === articleID) {
        const updatedArticle = {
          ...a,
          quantityInCart: a.quantityInCart + changeInQuantity,
        };
        return updatedArticle;
      }
      return a;
    });
    // Updates the articles with the modified article
    this.articles.next(updated);

    // Returns the modified article
    return of(updated.find((a) => a.id === articleID));
  }

  // Returns an observable that emits the new article
  create(article: Article): Observable<Article> {
    // Creates a new article
    const newArticle = {
      ...article,
      id: this.articles.value.length + 1,
      quantityInCart: 0,
    };
    // Adds the new article to the articles
    this.articles.next([...this.articles.value, newArticle]);
    // Returns the new article
    return of(newArticle);
  }
  */

  // Exercise 4
  // URL of the API
  apiUrl = 'http://localhost:3000/api/articles';

  constructor(private http: HttpClient) {}

  // Returns an observable of articles
  getArticles(filter: string = ''): Observable<Article[]> {
    // If filter is not empty, params will be equal to ?q=query. If filter is empty, there won't be params
    const params = filter ? new HttpParams().set('q', filter) : undefined;
    // GET request to the URL of the API
    return this.http.get<Article[]>(this.apiUrl, { params });
  }

  // Returns an observable of the updated article
  changeQuantity(articleID: number, changeInQuantity: number): Observable<any> {
    // PATCH request to the URL of the API
    return this.http.patch(`${this.apiUrl}/${articleID}`, { changeInQuantity });
  }

  // Returns an observable with the new article
  create(article: Article): Observable<Article> {
    // POST request to the URL of the API
    return this.http.post<Article>(this.apiUrl, article);
  }

  // Returns an observable with the article
  getArticleById(id: number): Observable<Article> {
    // GET request to the URL of the API
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }
}
