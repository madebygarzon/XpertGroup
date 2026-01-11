import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '@core/services/auth-http.service';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    if (!this.user) {
      this.router.navigate(['/auth/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get initials(): string {
    if (!this.user) return '';
    return `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`.toUpperCase();
  }
}
