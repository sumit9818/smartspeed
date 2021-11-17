import { Component, OnInit } from '@angular/core';
import { Response } from '@app/_models/delete-response.model';
import { AlertService, VideoService } from '@app/_services';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Component({
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
  })
  export class VideoComponent implements OnInit {
  
    videos:any;
    filepath: string;
    
    constructor( 
      private alertService: AlertService,
      private videoservice: VideoService
      ) {this.filepath = `${environment.imgUrl}` }

    ngOnInit(){
        this.videoservice.getAllVideo().pipe(first()).subscribe(videos => {this.videos = videos
			// console.log(this.videos)
	    })
    }

	deleteVideo(id): void {
        if (confirm("Are you sure you want to delete ?")){
           this.videoservice.deleteVideo(id).subscribe(
            data => {
                this.alertService.success('Deleted successfully', { keepAfterRouteChange: true });
                this.videoservice.getAllVideo()
                .pipe(first())
                .subscribe(videos => this.videos = videos);
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
       }
  
}