import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AlertService, FaqService } from '@app/_services';
import { environment } from '@environments/environment';
import { Coaches } from '@app/_models/coach.class';
import { SportDetails } from '@app/_models/sport-header.model';
import { Observable } from 'rxjs';
import { CoachNewServiceResponse } from '@app/_models/coach-new-response.model';
@Component({
  templateUrl: 'add-edit.component.html',
  styleUrls: ['faq.component.scss'] 
})
export class FaqAddEditComponent implements OnInit {

  form: FormGroup;
  _id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
	faq:any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private faqservice: FaqService,
  ) { this.route.params.subscribe(params => this.faq = params._id)}

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.isAddMode = !this._id;

    this.form = this.buildForm();
    this.updateFormValue();
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls }

  private buildForm(): FormGroup {
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    return this.formBuilder.group({
      isactive: [''],
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

    private updateFormValue(): void {
      if (!this.isAddMode) {
        this.faqservice.getFaqByID(this._id).subscribe(
			data => {this.faq = data
         	this.f.isactive.setValue(this.faq.data.isactive);
			this.f.question.setValue(this.faq.data.question);
			this.f.answer.setValue(this.faq.data.answer);
			}
			
		  )
    	}
    }


  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createFaq();
    } else {
        this.updatefaq();
    }
  }

  private createFaq() {
    this.faqservice.AddFaq(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Faq added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['/admin/pages/faq', { relativeTo: this.route }]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}

		private updatefaq() {
			this.faqservice.updateFaq(this._id, this.form.value)
				.pipe(first())
				.subscribe(
					data => {
						this.alertService.success('Update successfull', { keepAfterRouteChange: true });
						this.router.navigate(['/admin/pages/faq']);
					},
					error => {
						this.alertService.error(error);
						this.loading = false;
					});
		}
}