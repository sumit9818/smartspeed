import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AlertService, TestimonialsService, UploadService } from '@app/_services';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
@Component({
  templateUrl: 'add-edit.component.html',
})
export class TestimonialAddEditComponent implements OnInit {
  @ViewChild('resumeInput', { static: true }) resumeInput;
  imageUrl: string;
  fileToUpload: File = null;
  picture: string;
  filepath: string;

  form: FormGroup;
  _id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
	testimonial:any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private uploadService: UploadService,
    private testimonialService: TestimonialsService,
  ) { this.route.params.subscribe(params => this.testimonial = params._id)}

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
      image: [''],
      name: ['', Validators.required],
      testimonial: ['', Validators.required],
    });
  }

    private updateFormValue(): void {
      if (!this.isAddMode) {
        this.testimonialService.getTestimonialByID(this._id).subscribe(
			data => {this.testimonial = data
      this.filepath= `${environment.imgUrl}` +this.testimonial.data.image
			// console.log(this.userdata.data.roles.id)
      this.f.isactive.setValue(this.testimonial.data.isactive);
      this.f.image.setValue(this.testimonial.data.image);
			this.f.name.setValue(this.testimonial.data.name);
			this.f.testimonial.setValue(this.testimonial.data.testimonial);
			}
			
		  )
    	}
    }
    
  
    upFile(): void {
      let formData = new FormData();
      formData.append('file', this.resumeInput.nativeElement.files[0]);
      this.uploadService.addFileDetails(formData).subscribe(
        (result: any) => {
          this.picture = result.newfilename;
          this.filepath = `${environment.imgUrl}` + this.picture;
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
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
    this.testimonialService.AddTestimonial(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Faq added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['/admin/pages/testimonial']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}

		private updatefaq() {
			this.testimonialService.updateTestimonial(this._id, this.form.value)
				.pipe(first())
				.subscribe(
					data => {
						this.alertService.success('Update successfull', { keepAfterRouteChange: true });
						this.router.navigate(['/admin/pages/testimonial']);
					},
					error => {
						this.alertService.error(error);
						this.loading = false;
					});
		}
}