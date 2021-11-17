import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, HomePageService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-diffrent1',
  	templateUrl: 'diff1.component.html',
	  styleUrls: ['../diffrent.component.scss'] 
})
export class DiffrentOneComponent implements OnInit {
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	diffrent1:any;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private HomePageService: HomePageService,
	) { }

	
  	ngOnInit() {
	  	this.HomePageService.getDiffrent1().pipe(first()).subscribe(diffrent1 => {this.diffrent1 = diffrent1})
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
		this.HomePageService.getDiffrent1().subscribe(
			data => {this.diffrent1 = data
			this.f.isactive.setValue(this.diffrent1.data.isactive);
			this.f.title.setValue(this.diffrent1.data.title);
			this.f.description.setValue(this.diffrent1.data.description);
			}
		)
	}

	
	onSubmitDiffrent1() {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.invalid) {return;}
		this.loading = true;
		this.updateDiffrent1();
	}

	private updateDiffrent1() {
		this.HomePageService.AddDiffrent1(this.form.value).pipe(first()).subscribe(
			data => {this.alertService.success('Update successfull');
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
			});
	}
}