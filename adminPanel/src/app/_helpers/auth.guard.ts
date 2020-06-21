import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable(/*{ providedIn: 'root' }*/)
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = JSON.parse(sessionStorage.getItem('token'));
        if (currentUser) {
            return true;
        }else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        /*this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;*/
    }
}                                             