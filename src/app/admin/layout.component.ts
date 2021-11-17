import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { environment as env } from '@environments/environment';

@Component({ 
    templateUrl: './layout.component.html' ,
    styleUrls: ['./layout.component.scss'] 
})
export class LayoutComponent { 
    
    logo:any;
    filepath=`${env.imgUrl}`
    constructor(private accountService: AccountService,private http: HttpClient,){
        this.http.get(`${env.apiUrl}/website/logo`).subscribe(logo=>this.logo=logo)
    }

    
    logout() {
        this.accountService.logout();
    }
}