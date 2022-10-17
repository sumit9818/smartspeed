import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService,AlertService,AthleteService } from '@app/_services';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';

@Component({ 
    templateUrl: 'layout.component.html' ,
    styleUrls: ['layout.component.scss'] })
export class LayoutComponent implements OnInit { 

    filepath:any;
    user: any;
    athlete: any;
    logo:any;
    logoepath=`${environment.imgUrl}`
    subscription:any;
    plan:any;

    constructor(
        private as: AccountService,
        private http: HttpClient, 
        private AthleteService: AthleteService,
        private alertService: AlertService,
        private router: Router, ){
    }
    ngOnInit(){
        this.as.user.subscribe(x => this.user = x);
        this.filepath= `${environment.imgUrl}`+this.user.profile_pic;
        this.http.get(`${environment.apiUrl}/website/logo`).subscribe(logo=>this.logo=logo);
        
        this.as.getUserSubscription().subscribe(subscription =>{this.subscription =subscription
            this.plan = this.subscription.data.is_active
            if(this.subscription.data.is_active == false){
                this.router.navigate(['plan']);
            }
        })
        
    }

    BuyPlan(){
        this.alertService.error('Please Choose a Plan.' )
    }
L
    logout() {
        this.as.logout();
    }
}