import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, UserResponse } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountServiceURL: string;
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private router: Router, private http: HttpClient) {
    this.accountServiceURL = environment.apiUrl;
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('smartuser')));
    this.user = this.userSubject.asObservable();
  }
    // return this.http.get(`${environment.apiUrl}/user/get/subscription`)
  public get userValue(): User {
    return this.userSubject.value;
  }
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  private saveUserResponse(user: UserResponse) {
    if (user.success) {
        localStorage.setItem('smartuser', JSON.stringify(user.data));
        this.userSubject.next(user.data);
		
    }
  }

  login(username: string, password: string): Observable<UserResponse> {
    const loginUrl = `${this.accountServiceURL}/auth/signin`;
    return this.http.post<UserResponse>(loginUrl, { username, password })
      .pipe(tap((user: UserResponse) => this.saveUserResponse(user)));
	  
  }

  // remove user from local storage and set current user to null
  logout(): void {
    localStorage.removeItem('smartuser');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
  // USER 
  register(user: User) {
    return this.http.post(`${this.accountServiceURL}/auth/signup`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${this.accountServiceURL}/user/all`);
  }

  getById(id: string) {
    return this.http.get<User>(`${this.accountServiceURL}/user/${id}`);
  }

  update(id, params) {
    return this.http.put(`${this.accountServiceURL}/user/${id}`, params).pipe(
      map((x) => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('smartuser', JSON.stringify(user));
          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      })
    );
  }


  

  delete(id: string) {
    return this.http.delete(`${this.accountServiceURL}/user/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      })
    );
  }
  

  AddPlayerData(file: any) {
    return this.http.post(`${this.accountServiceURL}/fileupload`, file);
  }
  

  // ATHLETES API

  RegisterAthlete(params){
    return this.http.post(`${environment.apiUrl}/auth/signup`, params)
  }
  
  addAthleteVideo(video){
    return this.http.post(`${environment.apiUrl}/athlete/videolibrary`, video)
  }
  
  getAthleteAssessment() {
    return this.http.get(`${environment.apiUrl}/athlete/assessment/all`);
  }
  getAthleteDiary() {
    return this.http.get(`${environment.apiUrl}/athlete/diary/all`);
  }
  AddAthleteDiary(dairy) {
    return this.http.post(`${environment.apiUrl}/athlete/diary` , dairy);
  }

  deleteDiary(id: string) {
    return this.http.delete(`${this.accountServiceURL}/athlete/diary/${id}`)
  }

  addAthleteAssessmentData(assessment){
    return this.http.post(`${environment.apiUrl}/athlete/assessment/add`, assessment)
  }


  DeleteAthleteVideo(id: string){
    return this.http.delete(`${environment.apiUrl}/athlete/videolibrary/${id}`)
  }

  PaymentResponse(paymentdetails){
    return this.http.post(`${environment.apiUrl}/payment/create`, paymentdetails)
  }

  
  getUserSubscription(){
    return this.http.get(`${environment.apiUrl}/user/get/subscription`)
  }

}
