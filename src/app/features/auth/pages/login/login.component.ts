import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../../../shared/services/alert.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject (ToastrService);
  private alert = inject(AlertService);

  loading = false;
  // serverError = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });
  // email: any;
  // password: any;
  // http: any;

submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;
  // this.serverError = '';

  const email = this.email?.value;
  const password = this.password?.value;
  const remember = Boolean(this.form.value.remember);


  if (!email || !password) {
    this.alert.show('Invalid form data', 'warning');
    this.loading = false;
    return;
  }

  this.authService.login({ email, password }).subscribe({
    next: (res: any) => {
      this.loading = false;
      this.authService.saveToken(res.token, remember);
      this.alert.show('Logged in successfully!', 'success');
      this.router.navigate(['/']);
    },
    error: (err) => {
      this.loading = false;
      this.alert.show('Login failed. Please check your credentials.', 'error');
    },
  });
}

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then((observable) => {
      observable.subscribe({
          next: (res) => {
          localStorage.setItem('token', res.token);
          this.alert.show('Logged in with Google', 'success');
          this.router.navigate(['/products']);
          },
          error:() => {
            this.alert.show('Google login failed', 'error');
          }
        });
      })
      .catch(error => {
        if (error.code === 'auth/popup-closed-by-user') {
          this.alert.show('Login was canceled', 'warning');
        } else {
          console.error(error);
          this.alert.show('Google login failed', 'error');
        }
      });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
