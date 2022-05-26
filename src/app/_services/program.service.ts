import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramHeader } from '@app/_models/program-header.class';
import { ServiceResponse } from '@app/_models/service-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../_models/delete-response.model';
import { Program } from '../_models/program.model';
import { ProgramNewServiceResponse } from '../_models/program-new-response.model';
import { environment as env} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) {
    // this.programServiceURL = `${environment.apiUrl}/program`;
  }

  // getAllPrograms(): Observable<Program[]> {
  //   const getAllProgramsUrl = `${env.apiUrl}/new/program/all`;
  //   return this.http.get<ServiceResponse<Program[]>>(getAllProgramsUrl).pipe(map((response: ServiceResponse<Program[]>) => response.data));
  // }
  getAllPrograms(): Observable<Program[]> {
    const getAllProgramsUrl = `${env.apiUrl}/program/all`;
    return this.http.get<ServiceResponse<Program[]>>(getAllProgramsUrl).pipe(map((response: ServiceResponse<Program[]>) => response.data));
  }
  getAllProgramsByID(id): Observable<Program[]> {
    const getAllProgramsUrl = `${env.apiUrl}/athlete/program/all/${id}`;
    return this.http.get<ServiceResponse<Program[]>>(getAllProgramsUrl).pipe(map((response: ServiceResponse<Program[]>) => response.data));
  }

  getProgramById(id: string): Observable<Program> {
    const getProgramByIdUrl = `${env.apiUrl}/program/${id}`;
    return this.http.get<ServiceResponse<Program>>(getProgramByIdUrl).pipe(map((response: ServiceResponse<Program>) => response.data));
  }
  // getProgramById(id: string): Observable<Program> {
  //   const getProgramByIdUrl = `${env.apiUrl}/new/program/${id}`;
  //   return this.http.get<ServiceResponse<Program>>(getProgramByIdUrl).pipe(map((response: ServiceResponse<Program>) => response.data));
  // }
  getAthleteProgram(programID: string, AthleteID: string){
    // return this.http.get(`${env.apiUrl}/athlete/program/title/${id}`);
    return this.http.get(`${env.apiUrl}/new/program/${programID}/title?athlete_id=${AthleteID}`);
  }
// new/program/61558727e3022f3cfcad03f1/title?athlete_id=60a2285596de680015ab8cf1
  // addProgram(program) {
  //   return this.http.post(`${this.programServiceURL}`, program);
  // }

  addProgram(program: ProgramHeader): Observable<ProgramNewServiceResponse> {
    return this.http.post<ProgramNewServiceResponse>(`${env.apiUrl}/program`, program);
  }

  // updateProgram(id: string, program: ProgramHeader): Observable<ProgramHeader> {
  //   const updateProgramUrl = `${env.apiUrl}/new/program/${id}`;
  //   return this.http.put<ServiceResponse<ProgramHeader>>(updateProgramUrl, program).pipe(map((response: ServiceResponse<ProgramHeader>) => response.data))
  // }
  updateProgram(id: string, program: ProgramHeader): Observable<ProgramHeader> {
    const updateProgramUrl = `${env.apiUrl}/program/${id}`;
    return this.http.put<ServiceResponse<ProgramHeader>>(updateProgramUrl, program).pipe(map((response: ServiceResponse<ProgramHeader>) => response.data))
  }

  deleteProgram(id: string): Observable<Response> {
    const deleteProgramUrl = `${env.apiUrl}/program/${id}`;
    return this.http.delete<Response>(deleteProgramUrl);
  }
  
}