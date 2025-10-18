import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ProfileFormService } from '../../services/profile-form.service';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent implements OnInit {
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  private profileFormService = inject(ProfileFormService);

//   private fb = inject(FormBuilder);
//   private router = inject(Router);
//   private authService = inject(AuthService);
  
//   profileForm!: FormGroup;

// ngOnInit(): void {
//   this.profileForm = this.fb.group({
//     firstName: [''],
//     lastName: [''],
//     email: [{ value: '', disabled: true }],
//     address: [{ value: '', disabled: true }],
//     currentPassword: [''],
//     newPassword: [''],
//     confirmNewPassword: ['']
//   });

//   this.loadProfile();
// }

// loadProfile() {
//   this.authService.getProfile().subscribe(res => {
//     const [firstName, ...rest] = res.name.split(' ');
//     const lastName = rest.join(' ');
//     this.profileForm.patchValue({
//       firstName,
//       lastName,
//       email: res.email,
//       address: res.address || ''
//     });
//   });
// }


//   saveChanges(): void {
//     const { firstName, lastName, currentPassword, newPassword, confirmNewPassword } = this.profileForm.getRawValue();

//     if (newPassword && newPassword !== confirmNewPassword) {
//       this.toastr.error("Passwords don't match");
//       return;
//     }

//     this.authService.updateProfile({
//       name: `${firstName} ${lastName}`,
//       currentPassword,
//       newPassword
//     }).subscribe({
//       next: () => this.toastr.success("Profile updated successfully"),
//       error: () => this.toastr.error("Failed to update profile")
//     });
//   }


  profileForm!: FormGroup;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\u0600-\u06FF ]+$/)]],
      lastName:  ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\u0600-\u06FF ]+$/)]],
      email:      [{ value: '', disabled: true }],
      address:    [{ value: '', disabled: true }],
      dateOfBirth:[{ value: '', disabled: true }],
      currentPassword: [''],
      newPassword:     ['', [Validators.minLength(6)]],
      confirmNewPassword: ['']
    }, { validators: [this.matchPasswords] });


    this.profileFormService.loadProfileData(this.profileForm);
  }
  matchPasswords(group: FormGroup) {
  const newPassword = group.get('newPassword')?.value;
  const confirmNewPassword = group.get('confirmNewPassword')?.value;
  return newPassword === confirmNewPassword ? null : { passwordsMismatch: true };
}

  saveChanges(): void {
    if (this.profileForm.invalid) {
      this.toastr.error('Please fix the errors in the form.');
      return;
    }
    this.profileFormService.updateProfile(this.profileForm);
    // this.profileForm.reset();
  }

  resetForm(): void {
    this.profileFormService.loadProfileData(this.profileForm);
    this.toastr.info('Changes have been discarded.');
  }
}
