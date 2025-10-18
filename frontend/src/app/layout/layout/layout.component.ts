
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { FooterComponent } from "../components/footer/footer.component";
import { AlertOverlayComponent } from "../../shared/components/alert-overlay/alert-overlay.component";
import { AlertService } from '../../shared/services/alert.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent, LoaderComponent, FooterComponent, AlertOverlayComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
public alert= inject(AlertService);
}

