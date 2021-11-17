import { Component, OnInit,ViewChild, Input, Output ,  EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService,  UploadService } from '@app/_services';
import { environment } from '@environments/environment';
@Component({
    selector: 'file-upload',
    templateUrl: 'file.component.html',
})
export class FileComponent implements OnInit {
    @ViewChild('resumeInput', { static: true }) resumeInput;
	imageUrl: string;
	fileToUpload: File = null;
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
	
	filepath: string;
    submitted = false;
	routelink= this.route.url
    constructor(
		private route: Router,
        private alertService: AlertService,
		private uploadService: UploadService,
    ){}
    
	
    ngOnInit() {
		this.filepath = `${environment.imgUrl}`
	}

	upFile(): void {
        this.FileisUploading(true)
		let formData = new FormData();
		formData.append('file', this.resumeInput.nativeElement.files[0]);
		this.uploadService.addFileDetails(formData).subscribe(
		  (result: any) => {
			if(result.error === false){
				this.picture = result.newfilename;
				this.UpdatePicture(result.newfilename)
				this.filepath = `${environment.imgUrl}`;
				this.FileisUploading(false)
			}else{
				this.FileisUploading(false)
			}
			
		  }
		);
	}
}
