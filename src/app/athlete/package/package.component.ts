import { Component,Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AccountService, AlertService, AthleteService, PricingService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
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
    plan: any;
    onetimepricing: any;
    constructor(
        public http: HttpClient,
        private AccountService: AccountService,
        private AlertService: AlertService,
        private PricingService: PricingService,
        private router: Router,
        private AthleteService: AthleteService
    ) {
    }
    user:any;
    ngOnInit(): void {
        const uid:any = JSON.parse(localStorage.getItem('smartuser'))
        this.AccountService.getUserSubscription().subscribe(plan =>{
            this.plan =plan
            if(this.plan.data.is_active == true ){
                this.router.navigate(['account'])
            }
        })
        this.PricingService.getAllOneTimePricing().subscribe(
            plan=>{
                this.onetimepricing = plan;
                    this.onetimepricing.data.map(payme =>{
                    setTimeout(() => {
                        paypal.Buttons({
                            style: {
                              shape: 'rect',
                              color: 'gold',
                              layout: 'vertical',
                              label: 'paypal',
                            },
                    
                            createOrder: function(data, actions) {
                              return actions.order.create({
                                purchase_units: [{"amount":{"currency_code":"AUD","value":payme.price}}],
                                application_context: {shipping_preference: 'NO_SHIPPING'}
                              });
                            },
                    
                            onApprove: function(data, actions) {
                              return actions.order.capture().then(function(orderData) {
                                const xhttp = new XMLHttpRequest();
                                xhttp.open("POST", `${environment.apiUrl}/subscription/create`);
                                xhttp.setRequestHeader("Content-type", "application/json");
                                // xhttp.setRequestHeader("Authorization", JSON.parse(localStorage.getItem('smartuser')).accessToken);
                                xhttp.onload = function () {
                                    // do something to response
                                    alert('Your subscription created successfully   ');
                                    // location.reload()
                                };
                                xhttp.send(JSON.stringify({
                                    "payment_method":"Paypal",
                                    "user_id": JSON.parse(localStorage.getItem('smartuser')).id,
                                    "package_id": payme._id,
                                    "plan_id": 'onetime',
                                    "data":orderData,
                                    "order_id":orderData.purchase_units[0 ].payments.captures[0].id,
                                    "subscription_id":orderData.id
                                })); 
                                // Full available details
                                const getAth = new XMLHttpRequest();
                                // getAth.open("GET", `${environment.apiUrl}/athlete/${uid.id}`);
                                getAth.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                        uid.membership = getAth.response.data.membership
                                        uid.package_id = getAth.response.data.package_id
                                        uid.transactions = getAth.response.data.transactions
                                        localStorage.setItem('smartuser' , JSON.stringify(uid))
                                    }
                                };
                                getAth.open("GET", `${environment.apiUrl}/user/athlete/${uid.id}`, true);
                                getAth.setRequestHeader("Content-type", "application/json");
                                getAth.setRequestHeader("Authorization", uid.accessToken);
                                getAth.send();
                                // Show a success message within this page, e.g.
                                location.reload()
                              });
                            },
                    
                            onError: function(err) {
                              console.log(err);
                            }
                          }).render(document.getElementById(payme._id));
                    }, 1000)
                })
            }
        )
        
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
                            //console.log('Capture result', data, JSON.stringify(data, null, 2))
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
                                alert('Your subscription created successfully   ');
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
                this.AlertService.success('Payment successfull ');
            },
            error => {
                this.AlertService.error(error);
        }
        )
    }
}






