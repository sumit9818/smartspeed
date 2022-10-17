import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, AlertService, AthleteService, FaqService, PricingService } from '@app/_services';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
    templateUrl: 'list.component.html',
    // styleUrls: ['add-edit.component.scss'] 
 })
export class AthleteSubscriptionsComponent implements OnInit{
    subscription:any;
    id: string;
    subscriptionID: string;
    user:any;
    filepath= `${environment.imgUrl}`;
    constructor(
        private accountservice: AccountService,
        private http: HttpClient,
        private route: ActivatedRoute,
        private alertService:AlertService, 
        private PricingService: PricingService) {
        this.route.params.subscribe(params => this.subscription = params.subscriptionID);
    }
    date:any;
    pricing:any;
    currentplan:any
    plan:any;
    transaction:any;


    starttime:any;
    endtime:any;
    transactions:any;
    package:any;
    ngOnInit() {
        
        const today = moment();
        this.accountservice.getUserSubscription().pipe(first()).subscribe((plan:any) =>{
            this.plan =plan;
            if(plan.data.plan_id === 'lifetime'){
                this.transactions = JSON.parse(plan.data.transactions)
                this.http.get(`${environment.apiUrl}/website/pricing2/all`).subscribe(
                    pricing=>{
                        let p:any = pricing;
                        this.package = p.data.filter((x:any)=> x.id === this.plan.data.package_id)
                    }
                )
            }
            if(plan.data.plan_id != 'lifetime'){
            this.PricingService.getSubscriptionByID(this.plan.data.subscription_id).pipe(first()).subscribe(
                (subscription:any) => {this.subscription = subscription
                    this.PricingService.getFullTransication(this.plan.data.subscription_id, this.subscription.data.start_time  , today.format('YYYY-MM-DD')).pipe(first()).subscribe(
                        transaction => {
                            this.transaction = transaction;
                        })
                           
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
            }
        })
             
    }

    unsubscribe(){
        if (confirm("Are you sure you want to unsubscribe ?")){
            var subsID = {subscription_id: this.plan.data.subscription_id}
            this.PricingService.UnsubscribePlan(subsID).pipe(first()).subscribe(
                data => {
                    this.alertService.success('unsubscribe successfully', { keepAfterRouteChange: true });
                },
                error => {
                    this.alertService.error(error);
                }
            )
        }
    }
}