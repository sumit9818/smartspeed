import { Component, OnInit,ViewChild ,Input, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AlertService, BlogService, FaqService, UploadService } from '@app/_services';
import { environment } from '@environments/environment';
import { FileComponent } from '@app/admin/fileupload/file.component';
import { EventEmitter } from 'events';
@Component({
  templateUrl: 'add-edit.component.html',
})
export class BlogAddEditComponent implements OnInit {
	picture: string;
	loadingfile:boolean;
	onpictureChange(picture: string) {
		this.picture = picture;
	}
	onloadingfileChange(loadingfile: boolean) {
		this.loadingfile = loadingfile;
	}


  	filepath: any;
	bannerImg: string;
  
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	blog:any;

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
    private BlogService: BlogService,
		private uploadService: UploadService,
  ) { this.route.params.subscribe(params => this.blog = params._id)}

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
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

    private updateFormValue(): void {
      if (!this.isAddMode) {
        this.BlogService.getBlogByID(this._id).subscribe(
			data => {this.blog = data
         	this.f.isactive.setValue(this.blog.data.isactive);
         	this.f.image.setValue(this.blog.data.image);
			this.f.title.setValue(this.blog.data.title);
			this.f.description.setValue(this.blog.data.description);
			}
			
		  )
    	}
    }
	

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {return;}
    this.loading = true;
    if (this.isAddMode) {
        this.createBlog();
    } else {
        this.updateBlog();
    }
  }

	private createBlog() {
	this.BlogService.AddBlog(this.form.value).pipe(first()).subscribe(
		data => {
			this.alertService.success('Faq added successfully', { keepAfterRouteChange: true });
			this.router.navigate(['/admin/pages/blog']);
		},
		error => {
			this.alertService.error(error);
			this.loading = false;
		});
	}

	private updateBlog() {
	this.BlogService.updateBlog(this._id, this.form.value).pipe(first()).subscribe(
		data => {
			this.alertService.success('Update successfull', { keepAfterRouteChange: true });
			this.router.navigate(['/admin/pages/blog']);
		},
		error => {
			this.alertService.error(error);
			this.loading = false;
		});
	}
}