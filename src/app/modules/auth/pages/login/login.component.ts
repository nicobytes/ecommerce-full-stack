import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  showPassword = false;
  showSpinner = false;

  form = this.fb.nonNullable.group({
    email: ['admin@mail.com', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.showSpinner = true;
      const { email, password } = this.form.getRawValue();
      this.auth.login(email, password)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin']);
          },
          error: () => {
            this.showSpinner = false;
            this.openSnackBar('Invalid credentials', 'Close');
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000 });
  }
}
