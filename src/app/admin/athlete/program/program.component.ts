import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService, AthleteService, ProgramService } from '@app/_services';
import { environment } from '@environments/environment';
import { Athlete } from '@app/_models/athlete.class';
import { Response } from '@app/_models/delete-response.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-athlete-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ViewAthleteProgramsComponent implements OnInit {
	@Input() athleteID: string;
	@Output() ProgramID  = new EventEmitter<string>();

	athlete: Athlete[] = [];
	filepath: string;
	id: string;
	programs: any;
	programDetails: any;
	programID: string = 'undefiend';
	subtitles:any=[];
	status:any=[];
  constructor(private atheleteService: AthleteService, private alertService: AlertService,
    private route: ActivatedRoute,
    private http: HttpClient,
	private ProgramService: ProgramService
    ) {
    this.filepath = `${environment.imgUrl}`;
  }

  ngOnInit(): void {
	  this.id = this.route.snapshot.params['id']
	this.ProgramService.getAthleteProgramAll(this.athleteID).subscribe(
		data =>{
			this.programs = data;
		}
	)
  }


	getProgram(){
		this.ProgramService.getAthleteProgramAll(this.id).subscribe(
			data => {
				
				for(let x of data){
					if(x.id === this.programID){
						this.programDetails = x
					}
				}
			} 
		)
	}	
	update(i , id , e){
		const inputid = document.getElementById(id)
		// console.log(this.subtitles)
		if(e.target.checked == true){
			this.status[i]=true;
		}else{
			this.status[i]=false;
		}
		this.UpdateProgram({
			"athlete_id":this.athleteID,
			"subtitles":this.subtitles,
			"check":this.status
		}).subscribe(
            data => {
                this.alertService.success('Completed successfully', { keepAfterRouteChange: true });
            },
            error => {
                this.alertService.error(error);
		});

	}
	UpdateProgram(params) {
		return this.http.put(`${environment.apiUrl}/athlete/program/update/${this.programID}`, params);
	}

}
