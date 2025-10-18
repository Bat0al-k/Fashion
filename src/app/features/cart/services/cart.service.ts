import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface CartItem {
  _id: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
    brand?: string;
    code?: string;


}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CartResponse {
  items: CartItem[];
  total?: number;
}


const API_URL = `${environment.apiUrl}api/cart`;
const TEST_MODE = false;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = API_URL;
  private testMode = TEST_MODE;

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
  }

  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        this.cartItemsSubject.next(cartItems);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        this.cartItemsSubject.next([]);
      }
    }
  }

  private saveCartToLocalStorage(cartItems: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  getCart(): Observable<CartResponse> {
    if (this.testMode) {
      return of({ items: this.cartItemsSubject.value });
    }

    return this.http.get<CartResponse>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      map(response => {
        if (response && Array.isArray(response.items)) {
          this.cartItemsSubject.next(response.items);
          return response;
        } else {
          const localItems = this.cartItemsSubject.value;
          return { items: localItems };
        }
      }),
      catchError(error => {
        console.error('Error fetching cart:', error);
        const localItems = this.cartItemsSubject.value;
        return of({ items: localItems });
      })
    );
  }

  getCartItems(): Observable<CartItem[]> {
    if (this.testMode) {
      return this.cartItems$;
    }

    return this.http.get<CartItem[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      tap(items => {
        this.cartItemsSubject.next(items);
        this.saveCartToLocalStorage(items);
      }),
      catchError(error => {
        console.error('Error fetching cart items:', error);
        return this.cartItems$;
      })
    );
  }

  addToCart(product: CartItem): Observable<any> {
    const currentItems = this.cartItemsSubject.value;
      const existingItem = currentItems.find(item =>
    item.id === product.id &&
    (item.color || '') === (product.color ||'') &&
    (item.size || '') === (product.size || '')
  );

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      const newItem = {
        ...product,
        _id: product._id || product.id
      };
      currentItems.push(newItem);
    }

  // addToCart(product: CartItem): Observable<any> {
  //   const currentItems = this.cartItemsSubject.value;
  //   const existingItem = currentItems.find(item => item.id === product.id);

  //   if (existingItem) {
  //     existingItem.quantity += product.quantity;
  //   } else {
  //     const newItem = {
  //       ...product,
  //       _id: product._id || product.id
  //     };
  //     currentItems.push(newItem);
  //   }

  // addToCart(product: CartItem): Observable<any> {
  //   const currentItems = this.cartItemsSubject.value;
  //     const existingItem = currentItems.find(item =>
  //   item.id === product.id &&
  //   (item.color  '') === (product.color  '') &&
  //   (item.size  '') === (product.size  '')
  // );

    this.cartItemsSubject.next([...currentItems]);
    this.saveCartToLocalStorage(currentItems);

    if (this.testMode) {
      return of({ success: true, message: 'Item added to cart' });
    }

    const requestData = {
      productId: product.id,
      quantity: product.quantity
    };

    return this.http.post(this.apiUrl, requestData, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error adding item to cart:', error);
        if (error.status === 401) {
          return of({ success: true, message: 'Item added to local cart' });
        }
        return of({ success: false, message: 'Error adding item to cart' });
      })
    );
  }

  updateCartItem(itemId: string, quantity: number): Observable<any> {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => item._id === itemId || item.id === itemId);

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(itemId);
      }
      item.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
      this.saveCartToLocalStorage(currentItems);
    }

    if (this.testMode) {
      return of({ success: true, message: 'Quantity updated' });
    }

    return this.http.put(this.apiUrl, { itemId, quantity }, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Quantity updated:', response)),
      catchError(error => {
        console.error('Error updating quantity:', error);
        return of({ success: false, message: 'Error updating quantity' });
      })
    );
  }

  updateQuantity(productId: string, quantity: number): Observable<any> {
    return this.updateCartItem(productId, quantity);
  }

  removeFromCart(productId: string): Observable<any> {
    const currentItems = this.cartItemsSubject.value;
    const filteredItems = currentItems.filter(item => item._id !== productId && item.id !== productId);
    this.cartItemsSubject.next(filteredItems);
    this.saveCartToLocalStorage(filteredItems);

    if (this.testMode) {
      return of({ success: true, message: 'Item removed from cart' });
    }

    return this.http.delete(`${this.apiUrl}/${productId}`, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Item removed from cart:', response)),
      catchError(error => {
        console.error('Error removing item from cart:', error);
        return of({ success: false, message: 'Error removing item from cart' });
      })
    );
  }

  clearCart(): Observable<any> {
    this.cartItemsSubject.next([]);
    this.saveCartToLocalStorage([]);

    if (this.testMode) {
      return of({ success: true, message: 'Cart cleared' });
    }

    return this.http.delete(this.apiUrl, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Cart cleared:', response)),
      catchError(error => {
        console.error('Error clearing cart:', error);
        return of({ success: false, message: 'Error clearing cart' });
      })
    );
  }

  getCartTotal(): number {
    const items = this.cartItemsSubject.value;
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    const items = this.cartItemsSubject.value;
    return items.reduce((count, item) => count + item.quantity, 0);
  }

  isInCart(productId: string): boolean {
    const items = this.cartItemsSubject.value;
    return items.some(item => item.id === productId);
  }
}
