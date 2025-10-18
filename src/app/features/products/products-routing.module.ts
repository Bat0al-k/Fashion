

import { Routes ,RouterModule} from '@angular/router';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { NgModule } from '@angular/core';



export const routes: Routes = [
  { path: '', component: ProductListPageComponent },      // /products
  { path: ':id', component: ProductDetailsPageComponent } // /products/123
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule {}

