import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';
import { environment } from '@environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoAthletesComponent implements OnInit {
  videos:any;
  filepath:string;


  
    constructor(
      private accountService: AccountService,
      private http: HttpClient,
      private modalService: NgbModal,
	  private alertService: AlertService,
	  private router: Router
      ){
    }
    ngOnInit(){
      this.filepath =`${environment.imgUrl}` 
      const url = `${environment.apiUrl}/athlete/videolibrary/all`;
      this.accountService.getUserSubscription().subscribe((subs:any) =>{
        if(subs.is_active == false){
          this.router.navigate(['plan']);
        }
      })
      
    	this.http.get(url).subscribe(videos => {this.videos = videos})
    }

    open(VideoModal) {
      this.modalService.open(VideoModal, { size: 'md' });
    }

    
	
	deleteVideo(id): void {
        if (confirm("Are you sure you want to delete ?")){
           this.accountService.DeleteAthleteVideo(id).subscribe(
            data => {
                this.alertService.success('Deleted successfully', { keepAfterRouteChange: true });
                const url = `${environment.apiUrl}/athlete/videolibrary/all`;
				this.http.get(url).subscribe(videos => {this.videos = videos})
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
       }
}
