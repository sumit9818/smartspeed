import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AthleteHeader } from '@app/_models/athlete-header.class';
import { ServiceResponse } from '@app/_models/service-response.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Athlete } from '../_models/athlete.class';
import { Response } from '../_models/delete-response.model';
import { AccountService } from './account.service';
import { AthleteNewServiceResponse } from '../_models/athlete-new-response.model';

@Injectable({
  providedIn: 'root',
})
export class AthleteService {

  private athleteServiceURL: string;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.athleteServiceURL = `${environment.apiUrl}/user`;
  }

  getAllAthletes(): Observable<Athlete[]> {
    const getAllAthletesUrl = `${this.athleteServiceURL}/all/athlete`;
    return this.http.get<ServiceResponse<Athlete[]>>(getAllAthletesUrl).pipe(map((response: ServiceResponse<Athlete[]>) => response.data));
  }

  getAthleteById(id: string): Observable<Athlete> {
    const getAthleteByIdUrl = `${this.athleteServiceURL}/athlete/${id}`;
    return this.http.get<ServiceResponse<Athlete>>(getAthleteByIdUrl).pipe(map((response: ServiceResponse<Athlete>) => response.data));
  }

  addAthlete(athlete: AthleteHeader): Observable<AthleteNewServiceResponse> {
    const addAthleteUrl = `${this.athleteServiceURL}/add-athlete`;
    return this.http.post<AthleteNewServiceResponse>(addAthleteUrl, athlete);
  }

  updateAthlete(id: string, athlete: AthleteHeader): Observable<AthleteNewServiceResponse> {
    const updateAthleteUrl = `${this.athleteServiceURL}/update-athlete/${id}`;
    return this.http.put<AthleteNewServiceResponse>(updateAthleteUrl, athlete)
      .pipe(tap(() => {
          if (id == this.accountService.userValue.id) {
            const user = { ...this.accountService.userValue, ...athlete };
            localStorage.setItem('smartuser', JSON.stringify(user));
            this.accountService.userSubject.next(user);
          }
        })
      );
  }

  deleteAthlete(id: string): Observable<Response> {
    const deleteAthleteUrl = `${this.athleteServiceURL}/${id}`;
    return this.http.delete<Response>(deleteAthleteUrl);
  }
  

}
