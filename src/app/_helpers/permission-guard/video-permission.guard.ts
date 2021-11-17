import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/_services';
@Injectable({ providedIn: 'root' })

// VIEW Video
export class ViewVideoGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.video.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// EDIT Video
@Injectable({ providedIn: 'root' })
export class EditVideoGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.video.edit) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// ADD Video
@Injectable({ providedIn: 'root' })
export class AddVideoGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.video.add) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}