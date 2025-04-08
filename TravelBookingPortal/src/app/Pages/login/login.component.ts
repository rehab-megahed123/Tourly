import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ILogin } from '../../core/Interface/ilogin';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private spinner: NgxSpinnerService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.initFormControls();
    this.initFormGroup();
  }
  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8), // Minimum length of 8 characters
      Validators.maxLength(20), // Maximum length of 20 characters
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/), // At least one alphabetic character and one symbol
    ]);
  }

  initFormGroup(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.siginIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }

  siginIn(data: ILogin): void {
    this.spinner.show();
    this._authService.login(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.spinner.hide();
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          this._router.navigate(['Home']);
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.error(err);
        if (err.error) {
          alert(err.error.message);
        } else {
          alert('An error occurred. Please try again.');
        }
      },
    });
  }
}
