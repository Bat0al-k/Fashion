import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItem, CartService } from '../services/cart.service';
// import { AuthService } from '../../auth/services/services.component';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private cartService: CartService,
    private http: HttpClient
    // public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: (cart) => {
        console.log('Cart loaded:', cart);
        if (cart && Array.isArray(cart.items)) {
          this.cartItems = cart.items;
        } else if (cart && typeof cart === 'object' && 'items' in cart) {
          this.cartItems = Array.isArray(cart.items) ? cart.items : [];
        } else {
          console.error('Invalid cart format:', cart);
          this.cartItems = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading cart:', error);
        this.errorMessage = 'Failed to load cart';
        this.isLoading = false;
        this.cartItems = [];
      }
    });
  }

  updateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity < 1) {
      newQuantity = 1;
    }

    this.cartService.updateCartItem(itemId, newQuantity).subscribe({
      next: (response) => {
        console.log('Cart item updated:', response);
        this.loadCart(); // Reload cart to get updated data
      },
      error: (error) => {
        console.error('Error updating cart item:', error);
        // You could show an error message here
      }
    });
  }

  removeItem(itemId: string) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: (response) => {
        console.log('Item removed from cart:', response);
        this.loadCart(); // Reload cart to get updated data
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
        // You could show an error message here
      }
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (response) => {
        console.log('Cart cleared:', response);
        this.loadCart(); // Reload cart to get updated data
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
        // You could show an error message here
      }
    });
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.1; // 10% tax
  }

  getShipping(): number {
    return this.getSubtotal() > 100 ? 0 : 10; // Free shipping over $100
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax() + this.getShipping();
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }


  //add need checkout
async checkout() {
  const stripe = await loadStripe(environment.STRIPE_PUBLIC_KEY);

  const products = this.cartItems.map(i => ({
  // productId: i._id || '',      //////
  quantity : i.quantity,
  price    : i.price,
  name:i.name,

}));
  const token = sessionStorage.getItem('token');

    this.http.post<any>(
             `${environment.apiUrl}api/checkout/create-checkout-session`,
    { products },
    {
      headers: {
        Authorization:` Bearer ${token}`
      }
    }
  ).subscribe({
    next: async (res) => {
      if (res.url) {
        window.location.href = res.url;
      } else {
        console.error("No URL returned from Stripe");
      }
    },
    error: (error) => {
      console.error('Checkout error:', error);
    }
  });
}
onCheckout() {
  this.checkout();
}
  // canCheckout(): boolean {
  //   return !this.isCartEmpty() && this.authService.isAuthenticated();
  // }
}
