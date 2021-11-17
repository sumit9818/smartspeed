import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
	
	filepath = `${env.imgUrl}`;
	IconPath = `${env.IconUrl}`;
	form: FormGroup;
	
	_id: string;
	Icon_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	banner:any;
	config = {
		dialogsInBody: true,
		placeholder: '',
		tabsize: 2,
		height: '350px',
	};

	icons:any;

	
	constructor(
		private formBuilder: FormBuilder,
		private HomePageService: HomePageService,
		private CoachService: CoachService,
		private alertService: AlertService,
		private http: HttpClient,
        private modalService: NgbModal,
	  ) { }

	ngOnInit(){
		this.form = this.buildBannerForm()
		this.updateBannerValue()
		this.getSlides()
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
		console.log(id)
		this.iconid= id
    }

}

