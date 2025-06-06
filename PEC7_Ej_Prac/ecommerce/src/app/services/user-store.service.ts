import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  // Token key
  private readonly TOKEN_KEY = 'auth_token';

  // Emits the current status of the authentication
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  // Other components and services can subscribe
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  constructor() {}

  setAuthenticated(value: boolean) {
    // Updates the emitted value to the subscribers
    this.isAuthenticatedSubject.next(value);

    // If the value is true, saves the token in the localStorage
    if (value) {
      localStorage.setItem(this.TOKEN_KEY, 'sim_token');
    } else {
      // If the value is false, removes the token in the localStorage
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  get isAuthenticated(): boolean {
    // Returns the current status value of the authentication
    return this.isAuthenticatedSubject.value;
  }

  private hasToken(): boolean {
    // Checks if there is a saved token in the localStorage
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
