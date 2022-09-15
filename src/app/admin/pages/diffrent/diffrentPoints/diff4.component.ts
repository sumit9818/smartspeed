import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, HomePageService, UploadService,  } from '@app/_services';
import { environment } from '@environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';

@Component({
	selector: 'app-diffrent4',
  	templateUrl: 'diff4.component.html',
	  styleUrls: ['../diffrent.component.scss'] 
})
export class DiffrentFourComponent implements OnInit {
	@ViewChild('resumeInput', { static: true }) resumeInput;
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	diffrent:any;

	imageUrl: string;
	fileToUpload: File = null;
	picture: string;
	filepath: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private uploadService: UploadService,
		private alertService: AlertService,
		private HomePageService: HomePageService,
	) { }

	
  	ngOnInit() {
	  	this.HomePageService.getDiffrent4().pipe(first()).subscribe(diffrent => {this.diffrent = diffrent})
		// functions
		this.form = this.buildBannerForm()
		this.updateAboutValue()
  }

  	get f() { return this.form.controls }

	private buildBannerForm(): FormGroup {
		return this.formBuilder.group({
		  isactive: [''],
		  title: [''],
		  description: ['', Validators.required],
		});
	  }

	private updateAboutValue(): void {
		this.HomePageService.getDiffrent4().subscribe(
			data => {this.diffrent = data;
			this.filepath = `${environment.imgUrl}`+this.diffrent.data.title;
			this.f.isactive.setValue(this.diffrent.data.isactive);
			this.f.title.setValue(this.diffrent.data.title);
			this.f.description.setValue(this.diffrent.data.description);
			}
		)
	}
	upFile(): void {
		this.loading = true;
		let formData = new FormData();
		formData.append('file', this.resumeInput.nativeElement.files[0]);
		this.uploadService.addFileDetails(formData).subscribe(
		  (result: any) => {
			this.picture = result.data.newfilename;
			this.filepath = `${environment.imgUrl}` + this.picture;
			this.loading = false;
		  },
		  (error) => {
			this.alertService.error(error);
			this.loading = false;
		  }
		);
	  }
	
	
	  onSubmitDiffrent4() {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.invalid) {return;}
		this.loading = true;
		this.updateDiffrent();
	}

	private updateDiffrent() {
		this.HomePageService.AddDiffrent4(this.form.value).pipe(first()).subscribe(
			data => {this.alertService.success('Update successfull');
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false
			});
	}
}
