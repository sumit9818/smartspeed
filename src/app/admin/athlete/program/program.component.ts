import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService, AthleteService, ProgramService, VideoService } from '@app/_services';
import { environment } from '@environments/environment';
import { Athlete } from '@app/_models/athlete.class';
import { Response } from '@app/_models/delete-response.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    videos:any;
  constructor(private atheleteService: AthleteService, private alertService: AlertService,
    private route: ActivatedRoute,
    private http: HttpClient,
	private modalService: NgbModal,
	private ProgramService: ProgramService,
	private videoservice: VideoService
    ) {
    this.filepath = `${environment.imgUrl}`;
  }

  	ngOnInit(): void {
	  	this.id = this.route.snapshot.params['id']
		this.ProgramService.getAthleteProgramAll(this.id).subscribe(
			data =>{
				this.programs = data;
			}
		)
		this.getvideo()
	}
	getvideo(){
		this.videoservice.getAllVideo().subscribe(videos => {
			this.videos = videos
		})
}

	getProgram(){
		this.ProgramService.getAthleteProgramAll(this.id).subscribe(
			(data:any) => {
			let p = data.filter(x=> x.id === this.programID)
			this.programDetails = p[0]
			} 
		)
	}	

	update(i , id , e){
		var res={}
		if(e.target.checked == true){
			this.status[i]=true;
			res = [{
				"instructionId":id,
				"status":true,
			}]
		}else{
			this.status[i]=false;
			res = [{
				"instructionId":id,
				"status":false,
			}]
		}
		this.UpdateProgram(res).subscribe(
            data => {
                this.alertService.success('Updated successfully', { keepAfterRouteChange: true });
            },
            error => {
                this.alertService.error(error);
		});

	}
	
	UpdateProgram(params) {
		return this.http.put(`${environment.apiUrl}/athlete/program/update/${this.id}`, params);
	}

	openModal(VideoModal:any) {
		this.modalService.open(VideoModal, { size: 'lg' });
	}
}
