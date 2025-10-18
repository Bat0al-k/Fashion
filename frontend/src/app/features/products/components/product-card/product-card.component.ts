import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.interface';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule , CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input() product!: Product;
  @Output() addToCartClicked = new EventEmitter<Product>();
  constructor(private router: Router) {}

 goToDetails() {
   
  if (this.product?._id) {
    this.router.navigate(['/products', this.product._id]);
  } else {
    console.error(' Product or _id is missing:', this.product);
  }
}
  onAddToCart() {
    this.addToCartClicked.emit(this.product); 
  }
}


