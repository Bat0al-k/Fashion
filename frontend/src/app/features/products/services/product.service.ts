

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Product } from '../models/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private baseUrl = `${environment.apiUrl}api/products`;

  constructor(private http: HttpClient) {}

  // جلب كل المنتجات مع إمكانية إرسال فلاتر وباجينيشن
  getAll(
    filters?: {
      category?: string[];
      subcategory?: string[];
      sizes?: string[];
      minPrice?: number;
      maxPrice?: number;
      page?: number;
      limit?: number;
      sortBy?: string;
    }
  ): Observable<{ data: Product[]; pagination: any }> {
    let params = new HttpParams();

    if (filters) {
      if (filters.category && filters.category.length)
        params = params.append('category', filters.category.join(','));

      if (filters.subcategory && filters.subcategory.length)
        params = params.append('subcategory', filters.subcategory.join(','));

      if (filters.sizes?.length)
        params = params.append('size', filters.sizes.join(','));

      if (filters.minPrice !== undefined)
        params = params.append('minPrice', filters.minPrice.toString());

      if (filters.maxPrice !== undefined)
        params = params.append('maxPrice', filters.maxPrice.toString());

      if (filters.page !== undefined)
        params = params.append('page', filters.page.toString());

      if (filters.limit !== undefined)
        params = params.append('limit', filters.limit.toString());


       if (filters.sortBy)
      params = params.append('sortBy', filters.sortBy);
  }

    return this.http.get<{ data: Product[]; pagination: any }>(this.baseUrl, { params });
  }

  // جلب منتج واحد بالآي دي
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

//  جلب المنتجات المرتبطة بنفس الكاتيجوري والساب كاتيجوري
  getRelatedProducts(category: string, subcategory: string): Observable<Product[]> {
    const params = new HttpParams()
      .set('category', category)
      .set('subcategory', subcategory);

    return this.http.get<Product[]>(this.baseUrl, { params });
  }
}



