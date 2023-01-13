import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSerive: AuthService) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const routeUrl = route.url[0].path;

    if (!this.authSerive.getIsLoggedIn()) {
      return this.checkGuestPermission(routeUrl);
    }
    else {
      const role = JSON.parse(localStorage.getItem('user')!).role;

      switch (role) {
        case 'client':
          return this.checkClientPermission(routeUrl);
        case 'manager':
          return this.checkManagerPermission(routeUrl);
        case 'admin':
          return this.checkAdminPermission(routeUrl);
      }
    }

    return true;
  }

  checkClientPermission(routeUrl: string): boolean {
    switch (routeUrl) {
      case 'login':
      case 'signup':
      case 'create':
      case 'edit':
        return false;
      default:
        return true;
    }
  }

  checkManagerPermission(routeUrl: string): boolean {
    switch (routeUrl) {
      case 'login':
      case 'signup':
        return false;
      default:
        return true;
    }
  }

  checkAdminPermission(routeUrl: string): boolean {
    switch (routeUrl) {
      case 'login':
      case 'signup':
        return false;
      default:
        return true;
    }
  }

  checkGuestPermission(routeUrl: string): boolean {
    switch (routeUrl) {
      case 'trips':
      case 'login':
      case 'signup':
        return true;
      default:
        return false;
    }
  }
}
