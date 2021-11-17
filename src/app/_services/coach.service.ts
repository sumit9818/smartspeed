import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from '../_models/delete-response.model';
import { AccountService } from './account.service';
import { ServiceResponse } from '../_models/service-response.model';
import { Coaches } from '../_models/coach.class';
import { CoachNewServiceResponse } from '../_models/coach-new-response.model';
import { CoachHeader } from '@app/_models/coach-header.class';


@Injectable({
  providedIn: 'root',
})
export class CoachService {
  private coachServiceURL: string;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.coachServiceURL = `${environment.apiUrl}/user`;
  }

  getAllCoaches() {
    return this.http.get(`${this.coachServiceURL}/all/coach`);
  }

  getCoachById(id: string): Observable<Coaches> {
    const getCoachByIdUrl = `${this.coachServiceURL}/coach/${id}`;
    return this.http.get<ServiceResponse<Coaches>>(getCoachByIdUrl).pipe(map((response: ServiceResponse<Coaches>) => response.data));
  }

  addCoach(coach: CoachHeader): Observable<CoachNewServiceResponse> {
    const addCoachUrl = `${this.coachServiceURL}/add-coach`;
    return this.http.post<CoachNewServiceResponse>(addCoachUrl, coach);
  }

  updateCoach(id: string, coach: CoachHeader): Observable<CoachNewServiceResponse> {
    const updateCoachUrl = `${this.coachServiceURL}/update-coach/${id}`;
    return this.http.put<CoachNewServiceResponse>(updateCoachUrl, coach).pipe(
      tap(() => {
        // update stored user if the logged in user updated their own record
        if (id === this.accountService.userValue.id) {
          // update local storage
          const user = { ...this.accountService.userValue, ...coach };
          localStorage.setItem('user', JSON.stringify(user));
          // publish updated user to subscribers
          this.accountService.userSubject.next(user);
        }
      })
    );
  }

  deleteCoach(id: string): Observable<Response> {
    const deleteCoachUrl = `${this.coachServiceURL}/${id}`;
    return this.http.delete<Response>(deleteCoachUrl);
  }

}
