import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, HomePageService, UploadService } from '@app/_services';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Component({
	selector: 'app-diffrent3',
  	templateUrl: 'diff3.component.html',
	  styleUrls: ['../diffrent.component.scss'] 
})

export class DiffrentThreeComponent implements OnInit {
	@ViewChild('resumeInput', { static: true }) resumeInput;
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	diffrent3:any;

	imageUrl: string;
	fileToUpload: File = null;
	picture: string;
	filepath: string;


	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private uploadService:UploadService,
		private HomePageService: HomePageService,
	) { }

	
  	ngOnInit() {
	  	this.HomePageService.getDiffrent3().pipe(first()).subscribe(diffrent3 => {this.diffrent3 = diffrent3})
		this.form = this.buildBannerForm()
		this.updateAboutValue()
  }

  	get f() { return this.form.controls }

	private buildBannerForm(): FormGroup {
		return this.formBuilder.group({
		  isactive: [''],
		  title: ['', Validators.required],
		  description: [' '],
		});
	  }

	private updateAboutValue(): void {
		this.HomePageService.getDiffrent3().subscribe(
			data => {this.diffrent3 = data
			this.filepath = `${environment.imgUrl}`+this.diffrent3.data.title;
			this.f.isactive.setValue(this.diffrent3.data.isactive);
			this.f.title.setValue(this.diffrent3.data.title);
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
	
	onSubmitDiffrent3() {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.invalid) {return;}
		this.loading = true;
		this.updateDiffrent3();
	}

	private updateDiffrent3() {
		this.HomePageService.AddDiffrent3(this.form.value).pipe(first()).subscribe(
			data => {this.alertService.success('Update successfull');
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
			});
	}
}