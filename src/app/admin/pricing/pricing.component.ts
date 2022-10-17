import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, PricingService } from '@app/_services';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'pricing.component.html',
    styleUrls: ['pricing.component.scss'] 
 })
export class PricingComponent implements OnInit{

    constructor(
        private route: ActivatedRoute, 
        private PricingService: PricingService, 
        private alertService:AlertService) {
    }

    pricing:any;
    onetimepricing:any;
    ngOnInit() {
        this.PricingService.getAllPricing().pipe(first()).subscribe(
            pricing => {this.pricing = pricing}
        )

        this.PricingService.getAllOneTimePricing().pipe(first()).subscribe(
            pricing => {
                this.onetimepricing = pricing;
            }
        )
    }

}