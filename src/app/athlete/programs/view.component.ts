import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AlertService, VideoService } from '@app/_services';
import { environment } from '@environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ViewAthleteProgramComponent implements OnInit {
	progratitle:any;
	program:any;
	programDetails:any;
	user:any;
	id:any;
	videos:any;

	subtitles:any=[];
	status:any=[];

    constructor(
      private accountService: AccountService,
      private http: HttpClient,
      private route: ActivatedRoute,
      private alertService: AlertService,
	  private modalService: NgbModal,
	  private videoservice: VideoService,
      ){}
	  getvideo(){
		this.videoservice.getAllVideo().subscribe(videos => {
			this.videos = videos;
		})
	}
	ngOnInit(){
        this.accountService.user.subscribe(x => this.user = x);
		this.id = this.route.snapshot.params['id'];
		const url = `${environment.apiUrl}/new/program/all`;
    	this.http.get(url).subscribe(progratitle => {this.progratitle = progratitle;console.log('dd',this.progratitle )})
		this.getProgramByID();
		this.getvideo();
    }

	returnZero() {return 0}
	
    getProgramByID(){
		const url = `${environment.apiUrl}/athlete/program/all`;
		this.http.get(url).subscribe(
		programs => {
			this.program = programs;
			console.log(this.program.data)
			for(let x of this.program.data){
					if(`${x.id}` === `${this.id}`){
					this.programDetails = x;
					console.log(x.id, this.id, x)
				}
			}
		})
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
		return this.http.put(`${environment.apiUrl}/athlete/program/update`, params);
	}

	openModal(VideoModal:any) {
		this.modalService.open(VideoModal, { size: 'lg' });
	}

}
