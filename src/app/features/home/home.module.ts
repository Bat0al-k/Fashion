import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HOME_ROUTES } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
  ],
})
export class HomeModule {}
