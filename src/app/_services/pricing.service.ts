import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PricingService {
  private accountServiceURL: string;
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.accountServiceURL = environment.apiUrl;
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  // API not available
  getAllPricing() {
    return this.http.get(`${this.accountServiceURL}/package/all`);
  }
  AddPricing(pricing) {
    return this.http.post(`${this.accountServiceURL}/package`, pricing);
  }
  getPricingByID(_id:string) {
    return this.http.get(`${this.accountServiceURL}/package/${_id}`);
  }
  
  updatePricing(_id, params) {
    return this.http.put(`${this.accountServiceURL}/package/${_id}`, params)
  }
 
  CreateUserPlan(plan) {
    return this.http.post(`${environment.apiUrl}/subscription/create`, plan);
  }
  getAllSubscription() {
    return this.http.get(`${environment.apiUrl}/subscription/all`);
  }
  getSubscriptionByID(id) {
    return this.http.get(`${environment.apiUrl}/subscription/transaction/detail/${id}`);
  }
  getFullTransication(id, starttime,endtime) {
    return this.http.get(`${environment.apiUrl}/subscription/transaction/all?subscription_id=${id}&start_time=${starttime}&end_time=${endtime}T23:59:59Z`);
  }
  UnsubscribePlan(id) {
    return this.http.post(`${environment.apiUrl}/subscription/transaction/cancel`, id);
  }
  
  suspendPlan(id) {
    return this.http.post(`${environment.apiUrl}/subscription/${id}/suspend` , '');
  }
  ActivatesuspendPlan(id) {
    return this.http.post(`${environment.apiUrl}/subscription/${id}/activate` ,'');
  }
  // ${environment.apiUrl}/subscription/transaction/all?subscription_id=I-25KNY0PWDXME&start_time=2021-05-10T23:59:59Z&end_time=2021-06-11T23:59:59Z
  
}
