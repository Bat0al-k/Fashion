import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ProfileFormComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
[x: string]: any;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alert = inject(AlertService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  profileForm!: FormGroup;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [''],
      email: [{ value: '', disabled: true }],
      currentPassword: [''],
      newPassword: [''],
      confirmNewPassword: ['']
    });

    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.profileForm.patchValue({
          name: res.name,
          email: res.email
        });
      },
      error: () => {
        this.toastr.error('Failed to load profile');
      }
    });
  }

  saveChanges(): void {
    const { name, currentPassword, newPassword, confirmNewPassword } = this.profileForm.getRawValue();

    if (newPassword && newPassword !== confirmNewPassword) {
      this.toastr.error("Passwords don't match");
      return;
    }

    this.authService.updateProfile({
      name,
      currentPassword,
      newPassword
    }).subscribe({
      next: () => this.toastr.success("Profile updated successfully"),
      error: () => this.toastr.error("Failed to update profile")
    });
  }

  goToPayment() {
    // window.open('https://checkout.stripe.com/c/pay/cs_test_a1opx8CShbAWnY9nekWDCqVq0TSrn41fC1ZRr51JgVIzIhIBLA2eAGzCP3#fidkdWxOYHwnPyd1blpxYHZxWjA0V2BgbFdGZjZiT3JwPG9wSGpRdXBESTFvT3V3VENubWtMbXM3NEt8UG1ubHNdT0x1SzxSd0BCYFNjfG82djRUTXxSNDFAVDVpMUF9PXU3MWhibVVjdUdnNTVHNl9hTjJuSScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl', '_blank');
    // Open Stripe checkout in a new tab
    window.location.replace( 'https://checkout.stripe.com/c/pay/cs_test_a1opx8CShbAWnY9nekWDCqVq0TSrn41fC1ZRr51JgVIzIhIBLA2eAGzCP3#fidkdWxOYHwnPyd1blpxYHZxWjA0V2BgbFdGZjZiT3JwPG9wSGpRdXBESTFvT3V3VENubWtMbXM3NEt8UG1ubHNdT0x1SzxSd0BCYFNjfG82djRUTXxSNDFAVDVpMUF9PXU3MWhibVVjdUdnNTVHNl9hTjJuSScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl');
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  logout() {
    try {
      this.authService.logout();
      this.alert.show('Logged out successfully', 'success');
      this.router.navigate(['/auth/login']);
    } catch (error) {
      this.alert.show('Failed to log out', 'error');
    }
  }

}
