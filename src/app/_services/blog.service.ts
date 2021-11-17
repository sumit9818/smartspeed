import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class BlogService {
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
  getAllBlog() {
    return this.http.get(`${this.accountServiceURL}/blog/all`);
  }
  getBlogByID(_id:string) {
    return this.http.get(`${this.accountServiceURL}/blog/${_id}`);
  }
  AddBlog(testimonial) {
    return this.http.post(`${this.accountServiceURL}/blog/`, testimonial);
  }

  updateBlog(_id, params) {
    return this.http.put(`${this.accountServiceURL}/blog/${_id}`, params)
  }

  deleteBlog(_id: string) {
    return this.http.delete(`${this.accountServiceURL}/blog/${_id}`)
  }

}
