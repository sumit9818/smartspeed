import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/_services';
@Injectable({ providedIn: 'root' })

// VIEW Role
export class ViewRoleGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.role.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// EDIT Role
@Injectable({ providedIn: 'root' })
export class EditRoleGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.role.edit) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// ADD Role
@Injectable({ providedIn: 'root' })
export class AddRoleGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.role.add) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}