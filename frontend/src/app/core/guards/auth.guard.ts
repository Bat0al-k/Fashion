import { CanActivate, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  canActivate(): boolean {
    const token = this.auth.getToken();
    if (token) {
      return true;
    } else {
      this.toastr.warning('You must login first');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
