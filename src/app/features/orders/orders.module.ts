import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { OrdersService } from './services/orders.service';
import { ordersRoutes } from './orders-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ordersRoutes),
    UserOrdersComponent
  ],
  providers: [OrdersService]
})
export class OrdersModule {}
