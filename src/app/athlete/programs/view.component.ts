import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';
import { environment } from '@environments/environment';
@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ViewAthleteProgramComponent implements OnInit {
	progratitle:any;
	programs:any;
	user:any;
	id:any;

	subtitles:any=[];
	status:any=[];

    constructor(
      private accountService: AccountService,
      private http: HttpClient,
      private route: ActivatedRoute,
      private alertService: AlertService,
      ){}
    
	ngOnInit(){
		this.id = this.route.snapshot.params['id'];
		const url = `${environment.apiUrl}/new/program/all`;
    	this.http.get(url).subscribe(progratitle => {this.progratitle = progratitle})

		this.getProgramByID(this.id);
    }

	returnZero() {return 0}
	
    getProgramByID(id){
		// athlete_id
		const url = `${environment.apiUrl}/athlete/program/title/${id}`;
		this.http.get(url).subscribe(
		programs => {
			this.programs = programs;

			this.programs.data.map(data=>{
				this.subtitles.push(data.title)
				this.status.push(data.ischecked)
			})

			// console.log('==',this.programs.data)
		})
	}

	update(i , id , e){
		const inputid = document.getElementById(id)

		// console.log('submit==',{"subtitles":this.subtitles,
		// "check":this.status})
		
		if(e.target.checked == true){
			this.status[i]=true;
		}else{
			this.status[i]=false;
		}
		// /*
		// console.log(this.subtitles,this.status)
		this.UpdateProgram({
			"subtitles":this.subtitles,
			"check":this.status
		}).subscribe(
            data => {
                this.alertService.success('Completed successfully', { keepAfterRouteChange: true });
            },
            error => {
                this.alertService.error(error);
            });
			// */

	}


		UpdateProgram(params) {
			// console.log(params)
			return this.http.put(`${environment.apiUrl}/athlete/program/update/${this.id}`, params);
			
		}
		
}
