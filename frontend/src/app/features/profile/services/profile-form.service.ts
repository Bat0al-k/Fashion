import { Injectable, inject  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileFormService {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private alert = inject(AlertService);

  loadProfileData(form: FormGroup) {
    this.authService.getProfile().subscribe({
      next: (res) => {
        console.log("✅ Profile response:", res);
        const nameParts = res.name?.split(' ') || [];
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        // let dob = '';
        //       if (res.dateOfBirth) {
        //         const date = new Date(res.dateOfBirth);
        //         const day = String(date.getDate()).padStart(2, '0');
        //         const month = String(date.getMonth() + 1).padStart(2, '0');
        //         const year = date.getFullYear();
        //         dob = `${day}/${month}/${year}`;
        //       }        
      form.patchValue({
          firstName,
          lastName,
          email: res.email,
          address: res.address || '',
          // dateOfBirth: dob,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      },
      error: () => this.alert.show("Failed to load profile")
    });
  }

  updateProfile(form: FormGroup) {
    const { firstName, lastName, currentPassword, newPassword, confirmNewPassword } = form.getRawValue();

    if (newPassword && newPassword !== confirmNewPassword) {
      this.toastr.error("Passwords don't match");
      return;
    }

    const name = `${firstName} ${lastName}`;
    const data: any = { name };
    if (currentPassword && newPassword) {
      data.currentPassword = currentPassword;
      data.newPassword = newPassword;
    }

    this.authService.updateProfile(data).subscribe({
      next: () => {this.alert.show("Profile updated successfully");
      form.reset();},
      error: () => this.alert.show("Failed to update profile")
    });
  }

}
