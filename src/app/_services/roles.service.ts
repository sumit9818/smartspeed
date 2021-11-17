import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from '@app/_models/service-response.model';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Roles } from '../_models';
import { Response } from '../_models/delete-response.model';
import { RoleDetails } from '../_models/role-header.class';
import { RoleNew, RoleNewServiceResponse } from '../_models/role-new-response.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {

  private rolesServiceURL: string;

  constructor(private http: HttpClient) {
    this.rolesServiceURL = `${environment.apiUrl}/role`;
  }

  getAllRoles(): Observable<RoleDetails[]> {
    const getAllRolesUrl = `${this.rolesServiceURL}/all`;
    return this.http.get<ServiceResponse<RoleDetails[]>>(getAllRolesUrl).pipe(map((response: ServiceResponse<RoleDetails[]>) => response.data));
  }
  
  AddRole(params) {
    return this.http.post(`${this.rolesServiceURL}`, params);
  }

  updateRole(id, params) {
    return this.http.put(`${this.rolesServiceURL}/${id}`, params)
  }

  // deleteRole(id: string){
  //   const deleteRoleUrl = `${this.rolesServiceURL}/${id}`;
  //   return this.http.delete<Response>(deleteRoleUrl);
  // }

}
