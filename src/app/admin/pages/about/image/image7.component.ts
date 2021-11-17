import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, HomePageService,  } from '@app/_services';
import { environment } from '@environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';

@Component({
	selector: 'app-image7',
  	templateUrl: 'image7.component.html',
  	styleUrls: ['image.component.scss']
})
export class ImageSevenComponent implements OnInit {
	fileToUpload: File = null;
	filepath= `${environment.imgUrl}`;
	picture: any;

	offer2:any;
	form: FormGroup;
	_id: string;
	loading = false;
	submitted = false;
	isAddMode:boolean;

	
	config = {
		dialogsInBody: true,
		placeholder: '',
		tabsize: 2,
		height: '100px', 
		toolbar: [
			['color', ['forecolor']],
		  ]
	};
	constructor(
		private formBuilder: FormBuilder,
		private alertService: AlertService,
		private HomePageService: HomePageService,
        private modalService: NgbModal,
        private http: HttpClient,
	) { 
	}
  	ngOnInit() {
		this.HomePageService.getOffer7().pipe(first()).subscribe(offer2 => {this.offer2 = offer2})
		// functions   
		this.form = this.buildBannerForm()
		this.updateBannerValue()
  }

  	get f() { return this.form.controls }

	private buildBannerForm(): FormGroup {
		return this.formBuilder.group({
		  isactive: [true],
		  image: [''],
		  title: [' ']
		});
	  }

	private updateBannerValue(): void {
		this.HomePageService.getOffer7().subscribe(
			data => {this.offer2 = data
				// console.log(this.offer2)
			this.picture =this.offer2.data.image
			this.f.isactive.setValue(this.offer2.data.isactive);
			this.f.image.setValue(this.offer2.data.image);
			this.f.title.setValue(this.offer2.data.title);
			}
		)
	}

	
	onSubmitOffer2() {
		this.submitted = true;
		this.alertService.clear();
		// console.log(this.form.value)
		if (this.form.invalid) {return;}
		this.loading = true;

		this.createOffer2();
	}

	private createOffer2() {
		this.HomePageService.AddOffer7(this.form.value).pipe(first()).subscribe(
		data => {
			this.alertService.success('Updated successfully', { keepAfterRouteChange: true });
			this.loading = false;
		},
		error => {
			this.alertService.error(error);
			this.loading = false;
		});
	}

	progressImage: number;
	upFile(file): void {
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
		).subscribe();
	}
	   
}