import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
@Injectable({ providedIn: 'root' })
export class EmailService {
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  // API not available
  sendEmail(data) {
    return this.http.post(`${environment.apiUrl}/email/send/`, data);
  }
  EmailDelete(id) {
    return this.http.delete(`${environment.apiUrl}/email/send/${id}`, );
  }
  ReplyEmail(data) {
    return this.http.post(`${environment.apiUrl}/email/reply/`, data);
  }
  getEmailUser() {
    return this.http.get(`${environment.apiUrl}/email/users`);
  }
  getEmail(id) {
    return this.http.get(`${environment.apiUrl}/email/user/${id}`);
  }

  Read(id) {
    return this.http.post(`${environment.apiUrl}/email/${id}/markread`,{});
  }
  

  ReadChat(id) {
    return this.http.post(`${environment.apiUrl}/chat/${id}/markread`,{});
  }
  
  ChatUser() {
    return this.http.get(`${environment.apiUrl}/chat/users`);
  }
  GetAllChatUser() {
    return this.http.get(`${environment.apiUrl}/user/get/all`);
  }
  GetChatMessage(id) {
    return this.http.get(`${environment.apiUrl}/chat/user/${id}`);
  }
  SendChatMessage(data) {
    return this.http.post(`${environment.apiUrl}/chat/send`, data);
  }
  

}
