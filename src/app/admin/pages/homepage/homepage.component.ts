import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, CoachService, HomePageService } from '@app/_services';
import { catchError, first, map } from 'rxjs/operators';
import { environment as env} from '@environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.scss']
})
export class HomepageComponent implements OnInit {
	openImageModal(openImage, i) {
		
		for (let index = 0; index < 5; index++) {
			this.img[index] =false
			if(index == i){
				this.img[i] = true
			}else{
			}
		}
		this.modalService.open(openImage, { size: 'lg' });
	}
	
	img:any=[1]
	
	config = {
		dialogsInBody: true,
		placeholder: '',
		tabsize: 2,
		height: '100px', 
		focus: true,
		name:'config',
		toolbar: [
			['color', ['forecolor']],
		  ]
	};

	filepath = `${env.imgUrl}`;
	IconPath = `${env.IconUrl}`;
	form: FormGroup;
	TestimonialForm: FormGroup;
	
	_id: string;
	Icon_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	banner:any;
	
	icons:any;

	testimonials:any;
	
	constructor(
		private formBuilder: FormBuilder,
		private HomePageService: HomePageService,
		private CoachService: CoachService,
		private alertService: AlertService,
		private http: HttpClient,
        private modalService: NgbModal,
	  ) { }
	offer1:any;
	offer2:any;
	offer3:any;
	offer4:any;
	offer5:any;
	offer6:any;
	ngOnInit(){
		this.form = this.buildBannerForm()
		this.HomePageService.getOffer1().pipe(first()).subscribe(offer1 => {this.offer1 = offer1;})
		this.HomePageService.getOffer1().pipe(first()).subscribe(offer2 => {this.offer2 = offer2;})
		this.HomePageService.getOffer1().pipe(first()).subscribe(offer3 => {this.offer3 = offer3;})
		this.HomePageService.getOffer1().pipe(first()).subscribe(offer4 => {this.offer4 = offer4;})
		this.HomePageService.getOffer1().pipe(first()).subscribe(offer5 => {this.offer5 = offer5;})
		this.HomePageService.getOffer1().pipe(first()).subscribe(offer6 => {this.offer6 = offer6;})
		this.TestimonialForm = this.buildTestimonialForm()
		this.updateBannerValue()
		this.updateTestimonialForm()
		this.getSlides()
		this.HomePageService.getOffer7().pipe(first()).subscribe(testimonials => {this.testimonials = testimonials;})
	}

	get f() { return this.form.controls }

	private buildBannerForm(): FormGroup {
		return this.formBuilder.group({
			isactive: [true],
			image: [''],
			title: ['', Validators.required],
			description: ['', Validators.required],
		});
	}

	private updateBannerValue(): void {
		this.HomePageService.getHomeBanner().subscribe(
			data => {this.banner = data
			this.f.isactive.setValue(this.banner.data.isactive);
			this.f.image.setValue('');
			this.f.title.setValue(this.banner.data.title);
			this.f.description.setValue(this.banner.data.description);
			}
		)
	}
	

	
	onSubmitBanner() {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.invalid) {return;}
		this.loading = true;
		this.createBanner();
	}

	private createBanner() {
		this.HomePageService.AddHomeBanner(this.form.value).pipe(first()).subscribe(
		data => {
			this.alertService.success('Banner Updated successfully', { keepAfterRouteChange: true });
			this.loading = false;
		},
		error => {
			this.alertService.error(error);
			this.loading = false;
		});
	}
	// ===============================================================
	getSlides(){
		this.HomePageService.getHomeSlideAll().pipe(first()).subscribe(
			icons => {
				this.icons = icons;
			}
		)
	}


	deleteSlide(_id): void {
        if (confirm("Are you sure you want to delete ?")){
           this.HomePageService.DeletetHomeSlideImage(_id).subscribe(
            data => {
                this.alertService.success('Image Deleted successfully');
                this.HomePageService.getHomeSlideAll()
                .pipe(first())
                .subscribe(slides => this.icons = slides);
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
	}	
	open(Modal) {
        this.modalService.open(Modal, { size: 'lg' });
		this.iconid= null
    }
	iconid:any;
	edit(Modal , id) {
        this.modalService.open(Modal, { size: 'lg' });
		this.iconid= id
    }


	
	get t() { return this.TestimonialForm.controls }

	private buildTestimonialForm(): FormGroup {
		return this.formBuilder.group({
			isactive: [true],
			image: [''],
			title: ['', Validators.required],
		});
	}
	testimonialImage:any;
	private updateTestimonialForm(): void {
		this.HomePageService.getOffer8().subscribe(
			testimonials => {this.testimonials = testimonials
				this.testimonialImage = this.testimonials.data.image
				this.t.isactive.setValue(this.testimonials.data.isactive);
				this.t.image.setValue(this.testimonials.data.image);
				this.t.title.setValue(this.testimonials.data.title);
			}
		)
	}

	onSubmitcreatetestimonial() {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.invalid) {return;}
		this.loading = true;
		this.createtestimonial();
	}

	private createtestimonial() {
		this.HomePageService.AddOffer8(this.form.value).pipe(first()).subscribe(
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
		this.http.post(`${env.imgUpload}`, formData, {
			reportProgress: true,
			observe: "events"
		  }).pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				this.progressImage = Math.round((100 / event.total) * event.loaded);
			  } else if (event.type == HttpEventType.Response) {
				this.testimonialImage = event.body.data.newfilename;
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
	   
}

