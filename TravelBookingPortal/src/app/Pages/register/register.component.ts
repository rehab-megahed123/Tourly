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
import { CommonModule } from '@angular/common';
import { IRegister } from '../../core/Interface/iregister';
@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    NgxSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  firstName!: FormControl;
  lastName!: FormControl;
  userName!: FormControl;
  phoneNumber!: FormControl;
  city!: FormControl;
  state!: FormControl;
  street!: FormControl;
  email!: FormControl;
  password!: FormControl;
  birthDate!: FormControl;
  image!: FormControl;
  registerForm!: FormGroup;

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
    this.userName = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8), // Minimum length of 8 characters
      Validators.maxLength(20), // Maximum length of 20 characters
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/), // At least one alphabetic character and one symbol
    ]);
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.phoneNumber = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/), // Assuming phone number is 10 digits
    ]);
    this.city = new FormControl('', [Validators.required]);
    this.state = new FormControl('', [Validators.required]);
    this.street = new FormControl('', [Validators.required]);
    this.birthDate = new FormControl('', [Validators.required]);
    this.image = new FormControl('', [Validators.required]);
  }

  initFormGroup(): void {
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      userName: this.userName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      city: this.city,
      state: this.state,
      street: this.street,
      birthDate: this.birthDate,
      image: this.image,
    });
  }
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.image.setValue(input.files[0]); // Set the File object
    }
  }

  submit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      const formValue = this.registerForm.value;
      formData.append('email', formValue.email);
      formData.append('password', formValue.password);
      formData.append('userName', formValue.userName);
      formData.append('firstName', formValue.firstName);
      formData.append('lastName', formValue.lastName);
      formData.append('phoneNumber', formValue.phoneNumber);
      formData.append('state', formValue.state);
      formData.append('city', formValue.city);
      formData.append('street', formValue.street);
      formData.append(
        'dateOfBirth',
        new Date(formValue.birthDate).toISOString()
      );
      formData.append('createdAt', new Date().toISOString());
      if (formValue.image) {
        formData.append('image', formValue.image); // File object
      }
      this.signUp(formData);
    } else {
      this.registerForm.markAllAsTouched();
      Object.keys(this.registerForm.controls).forEach((control) =>
        this.registerForm.controls[control].markAsDirty()
      );
    }
  }

  signUp(registerData: FormData) {
    this.spinner.show();

    this._authService.register(registerData).subscribe({
      next: (response) => {
        if (response.success) {
          this.spinner.hide();
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          this._router.navigate(['Home']);
        }
      },
      error: (error) => {
        this.spinner.hide();
        console.error('Registration error:', error || error.error);
      },
    });
  }
}
