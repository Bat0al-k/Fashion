import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { AlertOverlayComponent } from './components/alert-overlay/alert-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LoaderComponent,
    AlertOverlayComponent,
    RouterModule
  ],
  exports: [
    CommonModule,
    HttpClientModule ,
    RouterModule
  ]
})
export class SharedModule { }
