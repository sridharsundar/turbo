import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'app/core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isAuthenticated())
      return true;
    if(route.data.roles && route.data.roles.indexOf('ADMIN') !== -1)
      this.router.navigate(['/auth/admin-login']);
    else
      this.router.navigate(['auth/login']);
    return false;
  }
}
