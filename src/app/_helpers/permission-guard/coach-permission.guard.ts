import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/_services';
@Injectable({ providedIn: 'root' })

// VIEW COACH
export class ViewCoachGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.coach.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// EDIT COACH
@Injectable({ providedIn: 'root' })
export class EditCoachGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.coach.edit) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// ADD COACH
@Injectable({ providedIn: 'root' })
export class AddCoachGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.coach.add) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}