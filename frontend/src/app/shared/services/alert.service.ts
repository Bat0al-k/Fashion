import { inject, Injectable, signal } from '@angular/core';
import { Location } from '@angular/common';

export type AlertType = 'success' | 'error' | 'warning';

export interface Alert {
  id: number;
  message: string;
  type: AlertType;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertsSignal = signal<Alert[]>([]);
  private idCounter = 0;
  
  alerts = this.alertsSignal.asReadonly();
  private location = inject(Location);

  constructor() {
    this.checkURLForVerification();
  }
  
  show(message: string, type: AlertType = 'success', duration = 6000) {
    const id = ++this.idCounter;
    const newAlert: Alert = { id, message, type };

    this.alertsSignal.update(alerts => [...alerts, newAlert]);

    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    this.alertsSignal.update(alerts => alerts.filter(alert => alert.id !== id));
  }

  checkURLForVerification() {
    const url = new URL(window.location.href);
    const verified = url.searchParams.get('verified');

    if (verified === 'success') {
      this.show('Email verified successfully', 'success');

      url.searchParams.delete('verified');
      const cleanUrl = url.pathname + url.search;
      this.location.replaceState(cleanUrl); 
    }
  }


}
