import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to Main layout
      this.router.navigate(['Main']);
      return false;
    }

    const role = this.authService.getRole();
    if (role === 'Admin') {
      this.router.navigate(['Admin']); // Redirect to Admin layout
      return false;
    } else {
      this.router.navigate(['Main']); // Redirect to Main layout
      return false;
    }
  }
}
