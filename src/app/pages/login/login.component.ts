import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: [null, Validators.required, Validators.email],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {

  }
}
