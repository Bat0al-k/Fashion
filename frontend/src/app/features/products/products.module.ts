// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { ProductCardComponent } from './components/product-card/product-card.component';
// import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
// import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
// import { ProductsRoutingModule } from './products-routing.module';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @NgModule({
//   // declarations: [],
//   imports: [
//     CommonModule,
//     HttpClientModule,
//     RouterModule,
//     FormsModule,
//     ProductsRoutingModule,

//     // Standalone components
//     ProductCardComponent,
//     ProductDetailsPageComponent,
//     ProductListPageComponent,]
// })
// export class ProductsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsRoutingModule } from './products-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Standalone components
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';

@NgModule({
  // لا تكتبي declarations هنا ❌
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ProductsRoutingModule,

    // ✅ هنا بتحطي الـ Standalone Components
    ProductCardComponent,
    ProductListPageComponent,
    ProductDetailsPageComponent
  ]
})
export class ProductsModule {}