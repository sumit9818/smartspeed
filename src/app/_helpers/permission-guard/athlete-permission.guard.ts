import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/_services';
@Injectable({ providedIn: 'root' })

// VIEW Athlete
export class ViewAthleteGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.athlete.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// EDIT Athlete
@Injectable({ providedIn: 'root' })
export class EditAthleteGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.athlete.edit) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// ADD Athlete
@Injectable({ providedIn: 'root' })
export class AddAthleteGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.athlete.add) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}