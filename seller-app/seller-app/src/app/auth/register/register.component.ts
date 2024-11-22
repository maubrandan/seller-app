import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterResponse } from './../../models/interfaces/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordsMatchValidator('password', 'confirmPassword')
    });
  }

  passwordsMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordsMismatch']) {
        return null; // Si otro validador ya encontró un error en confirmPassword, retornar
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordsMismatch: true });
        return { passwordsMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response: RegisterResponse) => {
          this.snackBar.open('User registered successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
          this.registerForm.reset();
        },
        (error: any) => {
          this.snackBar.open(`Registration error: ${error.message}`, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snack-bar-error']
          });
        }
      );
    } else {
      this.snackBar.open('Please correct the errors in the form', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }
  }
}
