import { Component } from '@angular/core';
import { LayoutComponent } from "./layout/layout/layout.component";
import { RouterOutlet, RouterModule} from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fashion Store';
}

