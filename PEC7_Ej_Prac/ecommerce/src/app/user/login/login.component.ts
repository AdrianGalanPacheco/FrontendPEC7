import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { UserStoreService } from '../../shared/services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed: boolean = false;

  // Form
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userStore: UserStoreService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // Validates the form
    if (this.loginForm.invalid) {
      return;
    }

    // Gets the data from the form
    const { username, password } = this.loginForm.value;

    // Login
    this.userService.login(username, password).subscribe({
      // Si se realiza con éxito, extraer el token, guardarlo en localStorage, autenticar el usuario y redirigir a /article/list
      // If login is successful, gets the token, saves it in localStorage, authenticates the user and redirects to /article/list
      next: (response) => {
        const token = response.token;
        localStorage.setItem('auth_token', token);
        this.userStore.setAuthenticated(true);
        this.loginFailed = false;
        this.router.navigate(['/article/list']);
      },
      // If login fails, sets the error
      error: () => {
        this.loginFailed = true;
      },
    });
  }
}
