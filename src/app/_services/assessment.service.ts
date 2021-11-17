import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@app/_models/delete-response.model';
import { ServiceResponse } from '@app/_models/service-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Assessment } from '../_models/assessment.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private assessmentServiceURL: string;

  constructor(private http: HttpClient) {
    this.assessmentServiceURL = `${environment.apiUrl}/assessment`;
  }

  getAllAssessments(): Observable<Assessment[]> {
    const getAllAssessmentsUrl = `${this.assessmentServiceURL}/all`;
    return this.http.get<ServiceResponse<Assessment[]>>(getAllAssessmentsUrl).pipe(map((response: ServiceResponse<Assessment[]>) => response.data));
  }

  getAssessmentById(id) {
    return this.http.get(`${this.assessmentServiceURL}/athlete/${id}`);
  }
  // getAssessment(id) {
  //   return this.http.get(`${this.assessmentServiceURL}/${id}`);
  // }

  getAthleteByAssessment(id){
    const getAssessmentByIdUrl = `${this.assessmentServiceURL}/${id}`;
    return this.http.get<ServiceResponse<Assessment>>(getAssessmentByIdUrl).pipe(map((response: ServiceResponse<Assessment>) => response.data));
  }

  addAssessment(assessment: Assessment): Observable<Assessment> {
    const addAssessmentUrl = this.assessmentServiceURL;
    return this.http.post<Assessment>(addAssessmentUrl, assessment);
  }

  updateAssessment(id: string, assessment: Assessment): Observable<Assessment> {
    const updateAssessmentUrl = `${this.assessmentServiceURL}/${id}`;
    return this.http.put<Assessment>(updateAssessmentUrl, assessment);
  }

  deleteAssessment(id: string): Observable<Response> {
    const deleteAssessmentUrl = `${this.assessmentServiceURL}/${id}`;
    return this.http.delete<Response>(deleteAssessmentUrl);
  }

  getAthleteAssesment(id:string, athleteID:string){
    return this.http.get(`${environment.apiUrl}/assessment/report/sprints?assessment_id=${id}&athlete_id=${athleteID}`)
  }
  getAthleteAssesmentDays(id:string, athleteID:string, days:number){
    return this.http.get(`${environment.apiUrl}/assessment/report/sprints?assessment_id=${id}&athlete_id=${athleteID}&days=${days}`)
  }
  getAthletesAllAssesment(id:string){
    return this.http.get(`${environment.apiUrl}/assessment/athlete/all/${id}`)
  }
  getAthletecharts(id:string, athleteID:string){
    return this.http.get(`${environment.apiUrl}/assessment/report/charts?assessment_id=${id}&athlete_id=${athleteID}`)
  }
}
