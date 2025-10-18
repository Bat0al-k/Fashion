import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-overlay.component.html',
  styleUrl: './alert-overlay.component.scss'
})
export class AlertOverlayComponent {
  alertService = inject(AlertService);

  get alerts() {
    return this.alertService.alerts();
  }

  close(id: number) {
    this.alertService.dismiss(id);
  }
}
