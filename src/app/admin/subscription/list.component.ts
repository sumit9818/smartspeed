import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, FaqService, PricingService } from '@app/_services';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'list.component.html',
    // styleUrls: ['add-edit.component.scss'] 
 })
export class SubscriptionsComponent implements OnInit{

    constructor(
        private route: ActivatedRoute, 
        private PricingService: PricingService, 
        private alertService:AlertService) {
    }

    subscriptions:any;
    ngOnInit() {
        this.PricingService.getAllSubscription().pipe(first()).subscribe(
            subscriptions => {this.subscriptions = subscriptions
            // console.log(this.subscriptions)
        }
        )
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