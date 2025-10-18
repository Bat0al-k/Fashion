import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../core/models/order.model';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  imports: [CommonModule]
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getUserOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error fetching orders:', err)
    });
  }
}
