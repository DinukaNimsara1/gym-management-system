import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.auth.isAuthenticated()) {
      return this.router.createUrlTree(['/login']);
    }

    const requiredRoles = (route.data?.['roles'] as Array<'admin' | 'member'> | undefined) ?? [];
    if (requiredRoles.length === 0) {
      return true;
    }

    const userRole = this.auth.getUserRole();
    if (userRole && requiredRoles.includes(userRole)) {
      return true;
    }

    // Redirect based on role or default to login
    if (userRole === 'admin') {
      return this.router.createUrlTree(['/admin/dashboard']);
    }
    if (userRole === 'member') {
      return this.router.createUrlTree(['/profile']);
    }
    return this.router.createUrlTree(['/login']);
  }
}


