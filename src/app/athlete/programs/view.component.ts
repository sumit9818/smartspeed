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
	filepath =`${environment.imgUrl}` 
    constructor(
      private accountService: AccountService,
      private http: HttpClient,
      private route: ActivatedRoute,
      private alertService: AlertService,
	  private modalService: NgbModal,
	  private videoservice: VideoService,
	  private router: Router,
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
		this.accountService.getUserSubscription().subscribe((subs:any) =>{
			if(subs.is_active == false){
				this.router.navigate(['plan']);
			}
		})

    	this.http.get(url).subscribe(progratitle => {this.progratitle = progratitle;})
		this.getProgramByID();
		this.getvideo();
    }

	returnZero() {return 0}
	
    getProgramByID(){
		const url = `${environment.apiUrl}/athlete/program/all`;
		this.http.get(url).subscribe(
		(programs:any) => {
			let program = programs.data.filter(x => x.id === this.id)
			this.programDetails = program[0]
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
