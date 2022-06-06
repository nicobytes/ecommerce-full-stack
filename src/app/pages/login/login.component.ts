import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.auth.login(email, password)
      .subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
