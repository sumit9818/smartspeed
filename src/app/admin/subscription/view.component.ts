import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  AccountService, AlertService, AthleteService, PricingService } from '@app/_services';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'view.component.html',
    styleUrls: ['view.component.scss'] 
 })
export class SubscriptionsViewComponent implements OnInit{
    subscription:any;
    id: string;
    subscriptionID: string;
    user:any;
    filepath= `${environment.imgUrl}`;
    constructor(
        private accountservice: AthleteService,
        private http: HttpClient,
        private route: ActivatedRoute, 
        private alertService: AlertService, 
        private PricingService: PricingService) {
        this.route.params.subscribe(params => this.subscription = params.subscriptionID);
    }
    date:any;
    pricing:any;
    currentplan:any
    ngOnInit() {
        // this.id = this.route.snapshot.params['id'];
        this.date=new Date();
        this.subscriptionID = this.route.snapshot.params['id'].split(',')[0];
        this.id = this.route.snapshot.params['id'].split(',')[1];
        this.getsubsctiptiondetails();
    }

    getsubsctiptiondetails(){
        this.PricingService.getSubscriptionByID(this.subscriptionID).pipe(first()).subscribe(
            subscription => {this.subscription = subscription
                console.log(subscription)
                this.http.get(`${environment.apiUrl}/website/pricing/all`).subscribe(pricing => { 
                    this.pricing = pricing; 
                    this.pricing.data.map(currentplan=>{
                        if(currentplan.plan_id === this.subscription.data.plan_id){
                            this.currentplan = currentplan
                        }
                    })
                })
            }
           )
           this.accountservice.getAthleteById(this.id).pipe(first()).subscribe(
            user => {this.user = user}
           )
    }

    suspendPlan(){
        if (confirm("Are you sure you want to Suspend this Account ?")){
            this.PricingService.suspendPlan(this.subscription.data.id).pipe(first()).subscribe(
                data => {
                    this.alertService.success('Suspended successfully', { keepAfterRouteChange: true });
                    this.getsubsctiptiondetails();
                },
                error => {
                    this.alertService.error(error);
                }
            )
        }
    }   
    
    ActivatePlan(){
        if (confirm("Are you sure you want to Activate this Account ?")){
            this.PricingService.ActivatesuspendPlan(this.subscription.data.id).pipe(first()).subscribe(
                data => {
                    this.alertService.success('Activated successfully', { keepAfterRouteChange: true });
                    this.getsubsctiptiondetails();
                },
                error => {
                    this.alertService.error(error);
                }
            )
        }
    }   
}