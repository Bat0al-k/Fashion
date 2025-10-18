import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ProfileComponent
  ]
})
export class ProfileModule { }


