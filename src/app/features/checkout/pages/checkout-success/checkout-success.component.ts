import { Component } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent {
  constructor(private router: Router) {}

  getUserOrders() {
    this.router.navigate(['/orders']);
  }
}
