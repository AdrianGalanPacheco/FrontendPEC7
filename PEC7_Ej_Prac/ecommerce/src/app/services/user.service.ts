import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Returns an observable that emits a LoginResponse object
  login(username: string, password: string): Observable<LoginResponse> {
    // POST to /user/login
    return this.http.post<LoginResponse>(`${this.apiUrl}/user/login`, {
      username,
      password,
    });
  }

  // Returns an observable with the server answer
  register(username: string, password: string): Observable<any> {
    // POST to /user/register
    return this.http.post(`${this.apiUrl}/user/register`, {
      username,
      password,
    });
  }
}
