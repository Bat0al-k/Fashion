
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductFilterComponent,
    PaginationComponent,
    RouterModule,
     FormsModule
  ],
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = [];

  filters: any = {
    category: '',
    subcategory: '',
    sizes: '',
    minPrice: 0,
    maxPrice: 1000000,
    sortBy: '' 
  };

  showSortDropdown: boolean = false;
  currentPage = 1;
  itemsPerPage = 8;
  totalItems = 0;
  showSidebar = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
     private router: Router,
     private cartService: CartService,

  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const initialCategory = params['category'];
      if (initialCategory) {
        this.filters.category = [initialCategory];
      }
      this.fetchProducts();
    });
  }

  buildFilterQuery() {
    const query = {
    category: Array.isArray(this.filters.category) ? this.filters.category : [this.filters.category],
subcategory: Array.isArray(this.filters.subcategory) ? this.filters.subcategory : [this.filters.subcategory],
sizes: this.filters.size ? [this.filters.size] : [],
      minPrice: this.filters.minPrice ?? 0,
      maxPrice: this.filters.maxPrice ?? 1000000,
      sortBy: this.filters.sortBy ?? '', 
      page: this.currentPage,
      limit: this.itemsPerPage
    };
    
    return query;
  }

  fetchProducts() {
    const query = this.buildFilterQuery();
    this.productService.getAll(query).subscribe(response => {
      const productArray = Array.isArray(response?.data) ? response.data : [];
      this.products = productArray;
      this.totalItems = response?.pagination?.total || productArray.length;

      const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      if (this.currentPage > totalPages && totalPages > 0) {
        this.currentPage = 1;
        this.fetchProducts();
        return;
      }
    }, error => {
      console.error("❌ Error fetching products:", error);
      this.products = [];
      this.totalItems = 0;
    });
  }

  applyFilters(filters: any) {
   
    this.filters = filters;
    this.currentPage = 1;
    this.fetchProducts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchProducts();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

 addToCart(product: Product): void {
  const cartItem = {
    _id: product._id,
    id: product._id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.image,
    color: product.colors?.[0] || ''
  };

  this.cartService.addToCart(cartItem).subscribe(() => {
    this.router.navigate(['/cart']);
  });
}

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
  }
}





