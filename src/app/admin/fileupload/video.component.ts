import { Component, OnInit,ViewChild, Input, Output ,  EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService,  UploadService } from '@app/_services';
import { environment } from '@environments/environment';

import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
    selector: 'video-upload',
    templateUrl: 'video.component.html',
})
export class VideoFileComponent implements OnInit {
	imageUrl: string;
	fileToUpload: File = null;
	progressImage: number;
	progressVideo: number;
	@Input() picture: string;
	@Output() pictureChange = new EventEmitter<string>();

	@Input() loadingfile: boolean;
	@Output() loadingfileChange = new EventEmitter<boolean>();

	UpdatePicture(picture): void {
    	this.pictureChange.emit(picture = this.picture);
	}
	FileisUploading(state:boolean): void {
    	this.loadingfileChange.emit(this.loadingfile = state);
	}

	// VIDEO UPLOAD VAR  VideoFile
	@ViewChild('VideoInput', { static: true }) VideoInput;
	@Input() VideoFile: string;
	@Output() VideoFileChange = new EventEmitter<string>();
	UpdateVideoFile(VideoFile): void {
    	this.VideoFileChange.emit(VideoFile = this.VideoFile);
	}


	
	filepath: string;
	Videofilepath: string;
    submitted = false;
    routelink:any;
    constructor(
		private route: Router,
		private http: HttpClient,
        private alertService: AlertService,
		private uploadService: UploadService,
    ){}
    
    ngOnInit() {
		this.filepath = `${environment.imgUrl}`
	}

	upFile(file): void {
		this.FileisUploading(true)
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
				this.UpdatePicture(event.body.newfilename);
				this.progressImage = null;
				this.FileisUploading(false)
			  }
			}),
			catchError((err: any) => {
			  this.progressImage = null;
			  this.FileisUploading(false)
			  alert(err.message);
			  return throwError(err.message);
			})
		  )
		  .subscribe();
	}
	
	upVideoFile(file) {
		this.FileisUploading(true)
		this.progressVideo = 1;
		const formData = new FormData();
		formData.append("file", file);
	
		this.http.post(`${environment.imgUpload}`, formData, {
			reportProgress: true,
			observe: "events"
		  }).pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				this.progressVideo = Math.round((100 / event.total) * event.loaded);
			  } else if (event.type == HttpEventType.Response) {
				this.VideoFile = event.body.newfilename;
				this.UpdateVideoFile(event.body.newfilename);
				this.progressVideo = null;
				this.FileisUploading(false)
			  }
			}),
			catchError((err: any) => {
			  this.progressVideo = null;
			  this.FileisUploading(false)
			  alert(err.message);
			  return throwError(err.message);
			})
		  )
		  .subscribe();
	  }
	
}
