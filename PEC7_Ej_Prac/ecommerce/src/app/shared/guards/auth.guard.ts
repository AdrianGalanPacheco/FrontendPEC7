import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';

export const authGuard: CanActivateFn = () => {
  // Contains the user authentication status
  const userStore = inject(UserStoreService);
  // Allows redirecting to routes
  const router = inject(Router);

  // If the user is authenticated, allows the access
  if (userStore.isAuthenticated) {
    return true;
  }
  // If the user is not authenticated, redirects to the login and blocks the access
  else {
    router.navigate(['/user/login']);
    return false;
  }
};
