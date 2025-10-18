
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { AlertService } from '../../../../shared/services/alert.service';



@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})

export class ProductDetailsPageComponent implements OnInit {

  productId: string | null = null;
  product: Product | undefined;
  selectedImage: string = '';
  selectedColor: string = '';
  selectedSize: string = '';
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private alert: AlertService,
    private cartService: CartService
   
  ) {}

 

// ngOnInit(): void {
//   this.route.paramMap.subscribe(params => {
//     this.productId = params.get('id');
//     if (this.productId) {
//       this.productService.getProductById(this.productId).subscribe(product => {
//         this.product = product;

//         this.selectedImage = product.image;
//         this.selectedColor = product.colors?.[0] || '';
//         this.selectedSize = product.sizes?.[0] || '';

//         const category = product.category || '';
//         const subcategory = product.subcategory || '';

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.productId = params.get('id');
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product;

        this.selectedImage = product.image;
        this.selectedColor =  '';
        this.selectedSize =  '';

        const category = product.category ||  '';
        const subcategory = product.subcategory || ''; 

        this.productService.getRelatedProducts(category, subcategory)
          .subscribe((data: any) => {
            const related = Array.isArray(data) ? data : data?.data || [];
            this.relatedProducts = related.filter((p: Product) => p._id !== product._id);
          });
      });
    }
  });
}

  getStars(rating: number): string[] {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const stars: string[] = Array(full).fill('full');
    if (half) stars.push('half');
    while (stars.length < 5) stars.push('empty');
    return stars;
  }

// addToCart(): void {
//   if (!this.product) return;

//   const cartItem = {
//     _id: this.product._id,
//     id: this.product._id,
//     name: this.product.name,
//     price: this.product.price,
//     quantity: 1,
//     image: this.product.image,
//     color: this.selectedColor || this.product.colors?.[0] || '',
//     size: this.selectedSize || this.product.sizes?.[0] || ''
//   };

//   this.cartService.addToCart(cartItem).subscribe(() => {
//     console.log('✅ Product added to cart');
//     this.router.navigate(['/cart']);
//   });
// }

addToCart(): void {
  if (!this.product) return;
  if (!this.selectedColor || !this.selectedSize) {
    // alert('Please select a color and size before adding to cart.');
    this.alert.show('Please select a color and size before adding to cart.');
    return;
  }

  const cartItem = {
    _id: this.product._id,
    id: this.product._id,
    name: this.product.name,
    price: this.product.price,
    quantity: 1,
    image: this.product.image,
    color: this.selectedColor ,
    size: this.selectedSize 
  };

  this.cartService.addToCart(cartItem).subscribe(() => {
    console.log('✅ Product added to cart');
    this.router.navigate(['/cart']);
  });
}

goToProduct(id: string): void {
  this.router.navigate(['/products', id]);
}

}
