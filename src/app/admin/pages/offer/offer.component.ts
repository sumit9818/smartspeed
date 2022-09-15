import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, HomePageService, UploadService } from '@app/_services';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-offer',
  	templateUrl: 'offer.component.html',
  	styleUrls: ['offer.component.scss']
})
export class OfferComponent implements OnInit {
	@ViewChild('offerInPut', { static: true }) offerInPut;
	imageUrl: string;
	fileToUpload: File = null;
	OfferImage: string;
	filepath: string;
	OfferImg: string;


	offer:any;
	form: FormGroup;
	_id: string;
	loading = false;
	submitted = false;
	isAddMode:boolean;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private HomePageService: HomePageService,
		private uploadService: UploadService,
	) { 
		
		
	}

  	ngOnInit() {
		this.OfferImg = `${environment.imgUrl}`
		this.HomePageService.getHomeOffer().pipe(first()).subscribe(offer => {this.offer = offer;})
		// functions   
		this.form = this.buildBannerForm()
		this.updateBannerValue()
  }

  	get f() { return this.form.controls }

	private buildBannerForm(): FormGroup {
		return this.formBuilder.group({
		  isactive: [''],
		  image: [''],
		  title: ['', Validators.required],
		  description: [''],
		});
	  }

	private updateBannerValue(): void {
		if (!this.isAddMode) {
			this.HomePageService.getHomeOffer().subscribe(
				data => {this.offer = data
				this.filepath = `${environment.imgUrl}`+this.offer.data.image
				this.f.isactive.setValue(this.offer.data.isactive);
				this.f.image.setValue(this.offer.data.image);
				this.f.title.setValue(this.offer.data.title);
				this.f.description.setValue(this.offer.data.description);
				}
			)
		}
	}

	upOfferImage(): void {
		this.loading=true
		let formData = new FormData();
		formData.append('file', this.offerInPut.nativeElement.files[0]);
		this.uploadService.addFileDetails(formData).subscribe(
		  (result: any) => {
			this.OfferImage = result.data.newfilename;
			this.filepath = `${environment.imgUrl}` + this.OfferImage;
			this.loading = false;
		  },
		  (error) => {
			this.alertService.error(error);
			this.loading = false;
		  }
		);
	  }
	
	onSubmitOffer() {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.invalid) {return;}
		this.loading = true;

		this.createOffer();
	}

	private createOffer() {
		this.HomePageService.AddHomeOffer(this.form.value).pipe(first()).subscribe(
		data => {
			this.alertService.success('Updated successfully', { keepAfterRouteChange: true });
			this.loading = false;
		},
		error => {
			this.alertService.error(error);
			this.loading = false;
		});
	}
	
}