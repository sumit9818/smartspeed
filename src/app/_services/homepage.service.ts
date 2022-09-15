import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class HomePageService {
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
  getHomeBanner() {
    return this.http.get(`${this.accountServiceURL}/home/banner/get`);
  }
  
  AddHomeBanner(banner) {
    return this.http.post(`${this.accountServiceURL}/home/banner/`, banner);
  }
  
  getHomeAbout() {
    return this.http.get(`${this.accountServiceURL}/home/about/get`);
  }
  
  AddHomeAbout(params) {
    return this.http.post(`${this.accountServiceURL}/home/about/`, params)
  }

  // icons
  
  AddIcon(icon) {
    return this.http.post(`${this.accountServiceURL}/home/slider/`, icon);
  }
  getIcons() {
    return this.http.get(`${this.accountServiceURL}/home/slider/get`);
  }
  DeletetIcon(id) {
    return this.http.delete(`${this.accountServiceURL}/home/slider/${id}`);
  }

  // 
  
  getHomeOffer() {
    return this.http.get(`${this.accountServiceURL}/home/offer/get`);
  }
  AddHomeOffer(offer) {
    return this.http.post(`${this.accountServiceURL}/home/offer/`, offer);
  }
  
  
  getOffer1() {return this.http.get(`${this.accountServiceURL}/home/offer/image1/get`)}
  AddOffer1(offer1) {return this.http.post(`${this.accountServiceURL}/home/offer/image1/`, offer1)}

  getOffer2() {return this.http.get(`${this.accountServiceURL}/home/offer/image2/get`)}
  AddOffer2(offer2) {return this.http.post(`${this.accountServiceURL}/home/offer/image2/`, offer2)}

  getOffer3() {return this.http.get(`${this.accountServiceURL}/home/offer/image3/get`)}
  AddOffer3(offer3) {return this.http.post(`${this.accountServiceURL}/home/offer/image3/`, offer3)}
  
  getOffer4() {return this.http.get(`${this.accountServiceURL}/home/offer/image4/get`)}
  AddOffer4(offer4) {return this.http.post(`${this.accountServiceURL}/home/offer/image4/`, offer4)}




  
  getOffer5() {return this.http.get(`${this.accountServiceURL}/home/offer/image5/get`)}
  AddOffer5(offer5) {return this.http.post(`${this.accountServiceURL}/home/offer/image5/`, offer5)}

  getOffer6() {return this.http.get(`${this.accountServiceURL}/home/offer/image6/get`)}
  AddOffer6(offer6) {return this.http.post(`${this.accountServiceURL}/home/offer/image6/`, offer6)}

  getOffer7() {return this.http.get(`${this.accountServiceURL}/home/offer/image7/get`)}
  AddOffer7(offer7) {return this.http.post(`${this.accountServiceURL}/home/offer/image7/`, offer7)}

  getOffer8() {return this.http.get(`${this.accountServiceURL}/home/offer/image8/get`)}
  AddOffer8(offer8) {return this.http.post(`${this.accountServiceURL}/home/offer/image8/`, offer8)}

  getOffer9() {return this.http.get(`${this.accountServiceURL}/home/offer/image9/get`)}
  AddOffer9(offer9) {return this.http.post(`${this.accountServiceURL}/home/offer/image9/`, offer9)}
 
  getDiffrentImage() {return this.http.get(`${this.accountServiceURL}/home/makesdifferent/image/get`)}
  AddDiffrentImage(updateDiffrentImage) {return this.http.post(`${this.accountServiceURL}/home/makesdifferent/image`, updateDiffrentImage)}
  
  getDiffrent() {return this.http.get(`${this.accountServiceURL}/home/makesdifferent/get`)}
  AddDiffrent(updateDiffrent) {return this.http.post(`${this.accountServiceURL}/home/makesdifferent/`, updateDiffrent)}
  
  getDiffrent1() {return this.http.get(`${this.accountServiceURL}/home/makesdifferent1/get`)}
  AddDiffrent1(updateDiffrent1) {return this.http.post(`${this.accountServiceURL}/home/makesdifferent1/`, updateDiffrent1)}
  
  getDiffrent2() {return this.http.get(`${this.accountServiceURL}/home/makesdifferent2/get`)}
  AddDiffrent2(updateDiffrent2) {return this.http.post(`${this.accountServiceURL}/home/makesdifferent2/`, updateDiffrent2)}
  
  getDiffrent3() {return this.http.get(`${this.accountServiceURL}/home/makesdifferent3/get`)}
  AddDiffrent3(updateDiffrent3) {return this.http.post(`${this.accountServiceURL}/home/makesdifferent3/`, updateDiffrent3)}
  
  getDiffrent4() {return this.http.get(`${this.accountServiceURL}/home/makesdifferent4/get`)}
  AddDiffrent4(updateDiffrent4) {return this.http.post(`${this.accountServiceURL}/home/makesdifferent4/`, updateDiffrent4)}
  
  getSlider() {return this.http.get(`${this.accountServiceURL}/home/slider/get`)}
  AddSlider(slider) {return this.http.post(`${this.accountServiceURL}/home/slider/`, slider)}

  getTimeline1() {return this.http.get(`${this.accountServiceURL}/home/timeline1/get`)}
  AddTimeline1(timeline1) {return this.http.post(`${this.accountServiceURL}/home/timeline1/`, timeline1)}
  
  getTimeline2() {return this.http.get(`${this.accountServiceURL}/home/timeline2/get`)}
  AddTimeline2(timeline2) {return this.http.post(`${this.accountServiceURL}/home/timeline2/`, timeline2)}

  getTimeline3() {return this.http.get(`${this.accountServiceURL}/home/timeline3/get`)}
  AddTimeline3(timeline3) {return this.http.post(`${this.accountServiceURL}/home/timeline3/`, timeline3)}
  
  getTimeline4() {return this.http.get(`${this.accountServiceURL}/home/timeline4/get`)}
  AddTimeline4(timeline4) {return this.http.post(`${this.accountServiceURL}/home/timeline4/`, timeline4)}


  AddHomeSlide(slide) {
    return this.http.post(`${this.accountServiceURL}/homeimageslider/`, slide);
  }
  getHomeSlideAll() {
    return this.http.get(`${this.accountServiceURL}/homeimageslider/all`);
  }
  UpdateHomeSlide(id , slide) {
    return this.http.put(`${this.accountServiceURL}/homeimageslider/${id}`, slide);
  }
  getHomeSlideImage(id) {
    return this.http.get(`${this.accountServiceURL}/homeimageslider/${id}`);
  }
  DeletetHomeSlideImage(id) {
    return this.http.delete(`${this.accountServiceURL}/homeimageslider/${id}`);
  }
  
  

}
