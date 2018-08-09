import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserSessionStorageService } from '../../providers/user-session-storage/user-session-storage.service';
import { UserLocalStorageService } from '../../providers/user-local-storage/user-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (
    private userSessionStorageService: UserSessionStorageService,
    private userLocalStorageService: UserLocalStorageService,
    private router: Router
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url.indexOf('login') !== -1) {
      // 直接去登录页面的话
      if (this.userSessionStorageService.hasUser() && this.userLocalStorageService.hasUser()) { 
        return true
      } else {
        this.router.navigateByUrl('/home/listdevice');
      }
    } else {
      if (this.userSessionStorageService.hasUser() && this.userLocalStorageService.hasUser()) {
        this.router.navigateByUrl('/login');
      } else {
          return true;
      }
    }
  }
}
