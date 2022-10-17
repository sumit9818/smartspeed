import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, FaqService, PricingService } from '@app/_services';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss'] 
 })
export class SubscriptionsComponent implements OnInit{

    constructor(
        private route: ActivatedRoute, 
        private PricingService: PricingService, 
        private alertService:AlertService) {
    }

    subscriptions:any;
    subscriptions2:any;
    pricing:any;
    tabs:boolean= true;
    ngOnInit() {
        this.PricingService.getAllSubscription().pipe(first()).subscribe(
            subscriptions => {this.subscriptions = subscriptions
        }
        )
       
        this.PricingService.getAllSubscription2().pipe(first()).subscribe(
            subscriptions => {this.subscriptions2 = subscriptions
        }
        )

        this.PricingService.getAllOneTimePricing().subscribe(
            res=> this.pricing = res
        )
    }

    tab(status:any){
        if(status == true){
            this.tabs = true
        }else{
            this.tabs = false
        }
    }

    // deleteFaq(_id): void {
    //     if (confirm("Are you sure you want to delete ?")){
    //        this.faqservice.deleteFaq(_id).subscribe(
    //         data => {
    //             this.alertService.success('Faq Deleted successfully', { keepAfterRouteChange: true });
    //             this.faqservice.getAllFaq()
    //             .pipe(first())
    //             .subscribe(faq => this.faq = faq);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //         },
    //         );
            
    //     }
       
    //    }
  
}