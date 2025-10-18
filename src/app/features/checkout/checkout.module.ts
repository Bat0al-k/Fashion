import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import{CheckoutSuccessComponent} from './pages/checkout-success/checkout-success.component';
import{CheckoutCancelComponent} from './pages/checkout-cancel/checkout-cancel.component';

@NgModule({
  declarations: [
],
  imports: [
    CommonModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }

