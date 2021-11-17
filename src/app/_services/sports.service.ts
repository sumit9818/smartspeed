import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from '@app/_models/service-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SportNewServiceResponse } from '../_models/sport-new-response.model';
import { Response } from '../_models/delete-response.model';
import { SportDetails } from '../_models/sport-header.model';

@Injectable({
  providedIn: 'root',
})
export class SportsService {

  private sportsServiceURL: string;

  constructor(private http: HttpClient) {
    this.sportsServiceURL = `${environment.apiUrl}/sports`;
  }

  getAllSports(): Observable<SportDetails[]> {
    const getAllSportsUrl = `${this.sportsServiceURL}/all`;
    return this.http.get<ServiceResponse<SportDetails[]>>(getAllSportsUrl).pipe(map((response: ServiceResponse<SportDetails[]>) => response.data));
  }

  addSports(sport: string): Observable<SportNewServiceResponse> {
    const addSportsUrl = `${this.sportsServiceURL}`;
    return this.http.post<SportNewServiceResponse>(addSportsUrl, sport);
  }

  updateSport(id: string, name: string): Observable<SportNewServiceResponse> {
    const updateSportUrl = `${this.sportsServiceURL}/${id}`;
    return this.http.put<SportNewServiceResponse>(updateSportUrl, name);
  }

  deleteSport(id: string): Observable<Response> {
    const deleteSportUrl = `${this.sportsServiceURL}/${id}`;
    return this.http.delete<Response>(deleteSportUrl);
  }

}
