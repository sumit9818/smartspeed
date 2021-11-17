import { Component,Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AccountService, AlertService, PricingService } from '@app/_services';
import { first } from 'rxjs/operators';
declare var paypal;

@Component({
    selector: 'app-package',
    templateUrl: 'package.component.html',
    styleUrls: ['package.component.scss']
})
export class PackageComponent implements OnInit {

    // CLAYTON PAYPAL DETAILS
    // client ID for clayton: AcmJEJffiyu3_dWGRsNXR2dJ3cZIcl0gnmofuJSL-4ZR65LYMyX2TfhEGwxYP5Le_jwgdqOB6sEhhAQf
    // secret: EC_u3z3g_wQsdKRdu6VgC6hzgXx-8IMUnqeavF3zHz7insx55isf4eoj-MFcG4SdmtnFnLsgy16kTu0c
    
    pricing: any;
    constructor(
        public http: HttpClient,
        private AccountService: AccountService,
        private AlertService: AlertService,
        private PricingService: PricingService
    ) {
    }
    ngOnInit(): void {
        
        this.http.get(`${environment.apiUrl}/website/pricing/all`).subscribe(pricing => { 
            this.pricing = pricing; 
            this.pricing.data.map(payme =>{
                if (payme.price != 0){
                setTimeout(() => {
                    paypal.Buttons({
                        style: {
                            shape: 'rect',
                            color: 'gold',
                            size: 'responsive',
                            layout: 'vertical',
                            
                        },
                        createSubscription: function(data, actions) {
                            return actions.subscription.create({
                              plan_id:  payme.plan_id
                            });
                          },
                          onApprove: function(data, actions) {
                            // console.log(actions, data)
                            alert('You have successfully created subscription ');
                            var plandetails = {
                                "payment_method":"Paypal",
                                "package_id": payme.id,
                                "plan_id": payme.plan_id,
                                "order_id":data.orderID,
                                "subscription_id":data.subscriptionID
                            }
                            
                            const xhttp = new XMLHttpRequest();
                            xhttp.open("POST", `${environment.apiUrl}/subscription/create`);
                            xhttp.setRequestHeader("Content-type", "application/json");
                            // xhttp.setRequestHeader("Authorization", JSON.parse(localStorage.getItem('smartuser')).accessToken);
                            xhttp.onload = function () {
                                // do something to response
                                location.reload()
                            };
                           
                            xhttp.send(JSON.stringify({
                                "payment_method":"Paypal",
                                "user_id": JSON.parse(localStorage.getItem('smartuser')).id,
                                "package_id": payme.id,
                                "plan_id": payme.plan_id,
                                "order_id":data.orderID,
                                "subscription_id":data.subscriptionID
                            })); 
                        },
                    }).render(document.getElementById(payme.id));
                }, 1000);
                }
            })
            
        })
    
    }
    
   UserPlan(details){
        this.PricingService.CreateUserPlan(details).pipe(first()).subscribe(
            data => {
                this.AlertService.success('Payment successfull');
            },
            error => {
                this.AlertService.error(error);
        }
        )
    }
}

