import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-blog',
     templateUrl: 'view.component.html',
     styleUrls: ['news.component.scss']
     })
export class ViewHomeBlogsComponent implements OnInit{
    blog:any;
    filepath:any
    id:string;
    title:string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private http: HttpClient,
        ) {
            this.route.params.subscribe(params => this.blog = params.id);
    }

   
    
    ngOnInit() {
        this.filepath =  `${environment.imgUrl}`;
        this.id = this.route.snapshot.params['id'];
        this.http.get(`${environment.apiUrl}/website/blog/`+this.id).pipe(first()).subscribe(blog=>{this.blog = blog;})
    }
}