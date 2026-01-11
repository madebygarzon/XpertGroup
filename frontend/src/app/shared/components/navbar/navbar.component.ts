import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '@core/services/auth-http.service';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser: User | null = null;

  constructor(
    private authService: AuthHttpService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/auth/login']);
  }
}
