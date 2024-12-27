import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/partials/navbar/navbar.component";
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_angular';

  showNavbar: boolean = true;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: any) => {
        if (event.url.includes('/user')) {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      });
  }
}
