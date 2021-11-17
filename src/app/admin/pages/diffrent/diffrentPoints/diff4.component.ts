import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, HomePageService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-diffrent4',
  	templateUrl: 'diff4.component.html',
	  styleUrls: ['../diffrent.component.scss'] 
})
export class DiffrentFourComponent implements OnInit {
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	diffrent4:any;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private HomePageService: HomePageService,
	) { }

	
  	ngOnInit() {
	  	this.HomePageService.getDiffrent4().pipe(first()).subscribe(diffrent4 => {this.diffrent4 = diffrent4})
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
		this.HomePageService.getDiffrent4().subscribe(
			data => {this.diffrent4 = data
			this.f.isactive.setValue(this.diffrent4.data.isactive);
			this.f.title.setValue(this.diffrent4.data.title);
			this.f.description.setValue(this.diffrent4.data.description);
			}
		)
	}

	
	onSubmitDiffrent4() {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.invalid) {return;}
		this.loading = true;
		this.updateDiffrent4();
	}

	private updateDiffrent4() {
		this.HomePageService.AddDiffrent4(this.form.value).pipe(first()).subscribe(
			data => {this.alertService.success('Update successfull');
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
			});
	}
}
