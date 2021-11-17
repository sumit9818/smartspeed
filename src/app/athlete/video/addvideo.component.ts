import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AccountService, AlertService, UploadService, VideoService } from '@app/_services';
import { environment } from '@environments/environment';
import { Observable, pipe } from 'rxjs';
import { HttpClient,HttpEventType } from '@angular/common/http';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
    selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./video.component.scss']
})
export class AddAthleteVideoComponent implements OnInit {
    // @ViewChild('resumeInput', { static: true }) resumeInput;
    // @ViewChild('VideoInput', { static: true }) VideoInput;
    videos:any;
    imageUrl: string;
    fileToUpload: File = null;
    progressImage: number;
	progressVideo: any;
    
    VideoUrl: string;
    VideofileToUpload: File = null;

	
    picture: any;
    filepath: string;
    
    VideoFile: any;
    Videofilepath: string;

	loadingImg = false;

    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    settings: {};
	  video:any;

    constructor(
		private formBuilder: FormBuilder,
		private accountService: AccountService,
		private http: HttpClient,
		private modalService: NgbModal,
		private alertService: AlertService,
        private uploadService: UploadService,
        
      ){
    }
    ngOnInit():void{
        this.form = this.buildForm();
	}

   upImageFile(file): void {
		this.loading=true
		this.progressImage = 1;
		const formData = new FormData();
		formData.append("file", file);
		this.http.post(`${environment.imgUpload}`, formData, {
			reportProgress: true,
			observe: "events"
		  }).pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				this.progressImage = Math.round((100 / event.total) * event.loaded);
			  } else if (event.type == HttpEventType.Response) {
				this.picture = event.body.newfilename;
				this.filepath = `${environment.imgUrl}` + this.picture;
				// console.log(event)
				this.progressImage = null;
				this.loading=false
			  }
			}),
			catchError((err: any) => {
			  this.progressImage = null;
			  this.loading=false
			  alert(err.message);
			  return throwError(err.message);
			})
		  )
		  .subscribe();
        
	}
  
	upVideoFile(file): void {
		this.loading=true
		this.progressVideo = 1;
		const formData = new FormData();
		formData.append("file", file);
	
		this.http.post(`${environment.imgUpload}`, formData, {
			reportProgress: true,
			observe: "events"
		  }).pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				this.progressVideo = Math.round((100 * event.loaded) / event.total ) + `%` ;
        if(this.progressVideo === "100%"){
          this.progressVideo = 'Please Wait'
        }
        // console.log(this.progressVideo)
			  } else if (event.type == HttpEventType.Response) {
				this.VideoFile = event.body.newfilename;
				this.Videofilepath = `${environment.imgUrl}` + this.VideoFile;
				this.progressVideo = null;
				this.loading=false
			  }
			}),
			catchError((err: any) => {
			  this.progressVideo = null;
			  this.loading=false
			  alert(err.message);
			  return throwError(err.message);
			})
		  )
		  .subscribe();
	}

    get f() { return this.form.controls }
    

    private buildForm(): FormGroup {
        return this.formBuilder.group({
            isactive: [true],
            title: [''],
            thumbnail_image: [''],
            video_url: [''],
            description: [''],
        });
    }

    onSubmit(): void {
        console.log(this.form.value);
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) return;
        this.loading = true;
        this.createVideo();
    }
    

    private createVideo() {
        this.accountService.addAthleteVideo(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Video added successfully', { keepAfterRouteChange: true });
                this.modalService.dismissAll();
                location.reload()
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
    
}
