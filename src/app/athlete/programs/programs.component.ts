import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { environment } from '@environments/environment';
@Component({
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  programs:any;
  user:any;
    constructor(
      private accountService: AccountService,
      private http: HttpClient
      ){
    }
    ngOnInit(){
      this.accountService.user.subscribe(x => {this.user = x});
      // const url = `${environment.apiUrl}/new/program/all`;
    	// this.http.get(url).subscribe(programs => {this.programs = programs})
    }
    
}
