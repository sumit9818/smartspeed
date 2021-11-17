import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, HomePageService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-diffrent',
  	templateUrl: 'diffrent.component.html',
	  styleUrls: ['diffrent.component.scss'] 
})
export class DiffrentComponent implements OnInit {
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	diffrent:any;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private HomePageService: HomePageService,
	) { }

	
  	ngOnInit() {
	  	this.HomePageService.getDiffrent().pipe(first()).subscribe(diffrent => {this.diffrent = diffrent})
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
		this.HomePageService.getDiffrent().subscribe(
			data => {this.diffrent = data
			this.f.isactive.setValue(this.diffrent.data.isactive);
			this.f.title.setValue(this.diffrent.data.title);
			this.f.description.setValue(this.diffrent.data.description);
			}
		)
	}

	
	onSubmitDiffrent() {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.invalid) {return;}
		this.loading = true;
		this.updateDiffrent();
	}

	private updateDiffrent() {
		this.HomePageService.AddDiffrent(this.form.value).pipe(first()).subscribe(
			data => {this.alertService.success('Update successfull');
				this.loading = false;
			},
			error => {
				this.alertService.error(error);
			});
	}
}