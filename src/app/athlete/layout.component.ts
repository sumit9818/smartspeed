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
        private accountService: AccountService,
        private http: HttpClient, 
        private AthleteService: AthleteService,
        private alertService: AlertService,
        private router: Router, ){
    }
    ngOnInit(){
        this.accountService.user.subscribe(x => this.user = x);
        this.filepath= `${environment.imgUrl}`+this.user.profile_pic;
        this.http.get(`${environment.apiUrl}/website/logo`).subscribe(logo=>this.logo=logo);

    this.plan = true
        fetch(`${environment.apiUrl}/user/get/subscription`, { 
            headers: new Headers({
              'Authorization': this.user.accessToken, 
              "Access-Control-Allow-Methods": "GET",
              "Access-Control-Allow-Origin": "*",
            }), 
          }).then(response => response.json())
          .then(data => {
                console.log(data)
                // this.plan = data.data.is_active
                // // if(data.data.is_active != false){
                // //     this.router.navigate(['account']);
                // // }
            });;
      
        
        // this.accountService.getUserSubscription().pipe(first()).subscribe(subscription =>{this.subscription =subscription
        //     this.plan = this.subscription.data.is_active
        //     // console.log(this.plan)
        //     // if(this.subscription.data.is_active != false){
        //     //     this.router.navigate(['account']);
        //     // }
        // })
        
    }

    BuyPlan(){
        this.alertService.error('Please Choose a Plan.' )
    }
L
    logout() {
        this.accountService.logout();
    }
}