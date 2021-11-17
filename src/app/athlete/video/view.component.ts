import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/_services';
import { environment } from '@environments/environment';
@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./video.component.scss']
})
export class ViewAthleteVideoComponent implements OnInit {
	videos:any;
	user:any;
	id:any;
  filepath:string;

    constructor(
      private accountService: AccountService,
      private http: HttpClient,
      private route: ActivatedRoute,
      ){}
    
	ngOnInit(){
		this.id = this.route.snapshot.params['id'];
    this.filepath =`${environment.imgUrl}` 
    
		const url = `${environment.apiUrl}/athlete/videolibrary/all`;
    	this.http.get(url).subscribe(videos => {this.videos = videos})
    }
    
}
