import { Routes } from '@angular/router';
import { ErrorComponent } from './layout/layout/error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AboutUsComponent } from './layout/layout/about-us/about-us.component';
import { ContactComponent } from'./layout/layout/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () =>
        import('./features/home/home.module').then(m => m.HomeModule),
    },{
        path: 'orders',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/orders/orders.module').then(m => m.OrdersModule),
      },
    ]
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
      path: 'auth',
      loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },{
      path: 'profile',
      canActivate: [AuthGuard],
      loadChildren: () =>
      import('./features/profile/profile.module').then(m => m.ProfileModule),
  },{
      path: 'products',
      loadChildren: () =>
      import('./features/products/products.module').then(m => m.ProductsModule),
  },{
      path: 'cart',
      canActivate: [AuthGuard],
      loadChildren: () =>
      import('./features/cart/cart.module').then(m => m.CartModule),
  },{
      path: '',
      redirectTo: 'cart',
      pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  }
];