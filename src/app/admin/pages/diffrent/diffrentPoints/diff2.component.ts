import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, HomePageService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-diffrent2',
  	templateUrl: 'diff2.component.html',
	  styleUrls: ['../diffrent.component.scss'] 
})
export class DiffrentTwoComponent implements OnInit {
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	diffrent2:any;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private HomePageService: HomePageService,
	) { }

	
  	ngOnInit() {
	  	this.HomePageService.getDiffrent2().pipe(first()).subscribe(diffrent2 => {this.diffrent2 = diffrent2})
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
		this.HomePageService.getDiffrent2().subscribe(
			data => {this.diffrent2 = data
			this.f.isactive.setValue(this.diffrent2.data.isactive);
			this.f.title.setValue(this.diffrent2.data.title);
			this.f.description.setValue(this.diffrent2.data.description);
			}
		)
	}

	
	onSubmitDiffrent2() {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.invalid) {return;}
		this.loading = true;
		this.updateDiffrent2();
	}

	private updateDiffrent2() {
		this.HomePageService.AddDiffrent2(this.form.value).pipe(first()).subscribe(
			data => {this.alertService.success('Update successfull');
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
			});
	}
}