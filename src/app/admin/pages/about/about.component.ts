import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, HomePageService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	config = {
		dialogsInBody: true,
		placeholder: '',
		tabsize: 2,
		height: '350px',
	  };
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private HomePageService: HomePageService,
	) { }

  	about:any;
  	ngOnInit() {
	  	this.HomePageService.getHomeAbout().pipe(first()).subscribe(about => {this.about = about})
		// functions
		this.form = this.buildBannerForm()
		this.updateAboutValue()
  }

  	get f() { return this.form.controls }

	private buildBannerForm(): FormGroup {
		return this.formBuilder.group({
		  isactive: [true],
		  title: ['blank'],
		  description: ['', Validators.required],
		});
	  }

	private updateAboutValue(): void {
		this.HomePageService.getHomeAbout().subscribe(
			data => {this.about = data
			this.f.isactive.setValue(this.about.data.isactive);
			this.f.title.setValue(this.about.data.title);
			this.f.description.setValue(this.about.data.description);
			}
		)
	}

	
	onSubmitAbout() {
		this.submitted = true;
		this.alertService.clear();
		
		if (this.form.invalid) {return;}
		this.loading = true;
		this.updateAbout();
	}

	private updateAbout() {
		this.HomePageService.AddHomeAbout(this.form.value).pipe(first()).subscribe(
			data => {this.alertService.success('About Update successfull');
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
			});
	}

}
