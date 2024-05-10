import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { userRegistration } from '../../../core/model/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userRegistrationForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            ),
          ],
        ],
        confirmedPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }
  // -----------------------Confirmed Password Code------------------------
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmedPassword = control.get('confirmedPassword');
    if (
      password &&
      confirmedPassword &&
      confirmedPassword.value &&
      password.value !== confirmedPassword.value
    ) {
      confirmedPassword.setErrors({ mismatch: true });
    } else {
      confirmedPassword?.setErrors(null);
    }
  }
  // -----------------------Submit Form Code------------------------
  onSubmit() {
    if (this.userRegistrationForm.valid) {
      const userData: userRegistration = this.userRegistrationForm.value;
      console.log(userData);
      this.userRegistrationForm.reset();
    } else {
      Object.keys(this.userRegistrationForm.controls).forEach((key) => {
        this.userRegistrationForm.get(key)?.markAsTouched();
      });
    }
  }
}
