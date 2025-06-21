import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerFailed: boolean = false;
  registerSuccess: boolean = false;

  // Form
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // Validates the form
    if (this.registerForm.invalid) {
      return;
    }

    // Gets the data from the form
    const { username, password } = this.registerForm.value;

    // Register
    this.userService.register(username, password).subscribe({
      // If register is successful, redirects to /login
      next: () => {
        this.registerFailed = false;
        this.registerSuccess = true;
        this.router.navigate(['/user/login']);
      },
      // If register fails, sets the error
      error: () => {
        this.registerFailed = true;
        this.registerSuccess = false;
      },
    });
  }
}
