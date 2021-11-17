import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/_services';
@Injectable({ providedIn: 'root' })

// Homepage
export class ViewHomePageGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.homepage.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}


// FAQ
@Injectable({ providedIn: 'root' })
export class ViewFaqGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.faq.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class EditFaqGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.faq.edit) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
@Injectable({ providedIn: 'root' })
export class AddFaqGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.faq.add) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}


// Testimonial
@Injectable({ providedIn: 'root' })
export class ViewTestimonialGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.testmonial.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class EditTestimonialGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.testmonial.edit) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
@Injectable({ providedIn: 'root' })
export class AddTestimonialGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.testmonial.add) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// Blog
@Injectable({ providedIn: 'root' })
export class ViewBlogGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.blog.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class EditBlogGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.blog.edit) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
@Injectable({ providedIn: 'root' })
export class AddBlogGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.blog.add) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// Pricing
@Injectable({ providedIn: 'root' })
export class ViewPricingGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.pricing.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class EditPricingGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.pricing.edit) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
@Injectable({ providedIn: 'root' })
export class AddPricingGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.pricing.add) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// Sport
@Injectable({ providedIn: 'root' })
export class ViewSportGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.sport.view) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class EditSportGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.sport.edit) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
@Injectable({ providedIn: 'root' })
export class AddSportGuard implements CanActivate {
    constructor( private router: Router,private accountService: AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue.roles.permissions;
        if (user) {
            if (route.data.permission && route.data.permission.indexOf(user.sport.add) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}