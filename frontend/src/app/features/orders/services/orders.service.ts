import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Order } from '../../../core/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = `${environment.apiUrl}api/orders`;

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<Order[]> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Order[]>(this.baseUrl, { headers });
  }
}
