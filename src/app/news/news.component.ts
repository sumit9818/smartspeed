import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-blog',
     templateUrl: 'news.component.html',
     styleUrls: ['news.component.scss']
     })
export class HomeBlogsComponent implements OnInit{
    blogs:any;
    filepath:any
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private http: HttpClient,
        ) {
    }
    
    ngOnInit() {
        this.filepath =  `${environment.imgUrl}`;
        this.http.get(`${environment.apiUrl}/website/blog/all`).subscribe(res=>{this.blogs = res;})
    }

}