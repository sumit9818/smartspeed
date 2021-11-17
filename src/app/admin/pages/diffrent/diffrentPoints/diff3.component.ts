import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, HomePageService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-diffrent3',
  	templateUrl: 'diff3.component.html',
	  styleUrls: ['../diffrent.component.scss'] 
})

export class DiffrentThreeComponent implements OnInit {
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	diffrent3:any;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private HomePageService: HomePageService,
	) { }

	
  	ngOnInit() {
	  	this.HomePageService.getDiffrent3().pipe(first()).subscribe(diffrent3 => {this.diffrent3 = diffrent3})
		// functions
		this.form = this.buildBannerForm()
		this.updateAboutValue()
  }

  	get f() { return this.form.controls }

	private buildBannerForm(): FormGroup {
		return this.formBuilder.group({
		  isactive: [''],
		  title: ['', Validators.required],
		  description: ['', Validators.required],
		});
	  }

	private updateAboutValue(): void {
		this.HomePageService.getDiffrent3().subscribe(
			data => {this.diffrent3 = data
			this.f.isactive.setValue(this.diffrent3.data.isactive);
			this.f.title.setValue(this.diffrent3.data.title);
			this.f.description.setValue(this.diffrent3.data.description);
			}
		)
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