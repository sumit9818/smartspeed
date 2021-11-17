import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  AccountService, AthleteService, PricingService } from '@app/_services';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'transaction.component.html',
    // styleUrls: ['add-edit.component.scss'] 
 })
export class TransactionComponent implements OnInit{
    subscription:any;
    subscriptionID: string;
    user:any;
    filepath= `${environment.imgUrl}`;
    plan:any;
    constructor(
        private accountservice: AthleteService,
        private route: ActivatedRoute, 
        private PricingService: PricingService) {
        this.route.params.subscribe(params => this.subscription = params.subscriptionID);
    }
    starttime:any;
    endtime:any;
    ngOnInit() {
        this.subscriptionID = this.route.snapshot.params['id'].split(',')[0];
        this.starttime = this.route.snapshot.params['id'].split(',')[1];
        this.endtime = this.route.snapshot.params['id'].split(',')[2];
       
        this.PricingService.getSubscriptionByID(this.subscriptionID).pipe(first()).subscribe(
            plan => {this.plan = plan}
           )


        this.PricingService.getFullTransication(this.subscriptionID, this.starttime , this.endtime).pipe(first()).subscribe(
        subscription => {
            this.subscription = subscription;

        }
       )
    }

    
}