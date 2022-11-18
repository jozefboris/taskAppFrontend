import { Injectable } from '@angular/core';      
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router';      
import { map, Observable, take } from 'rxjs';      
import { AuthService } from './auth.service';
@Injectable({      
   providedIn: 'root'      
})      
export class AuthGuard implements CanActivate {      
   constructor(private router: Router, private authService: AuthService) { }      
   
   canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ):
      | boolean
      | UrlTree
      | Promise<boolean | UrlTree>
      | Observable<boolean | UrlTree> {
      return this.authService.user.pipe(
        take(1),
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/login']);
        })
      );
    }     
} 