import { Component, EventEmitter, Input, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AlertService, BlogService, FaqService, HomePageService, UploadService } from '@app/_services';
import { environment } from '@environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
	selector: 'app-banner',
  templateUrl: 'add-edit.component.html',
  styleUrls: ['banner.component.scss'] 
})
export class BannerAddEditComponent implements OnInit {
  @ViewChild('resumeInput', { static: true }) resumeInput;
	imageUrl: string;
	fileToUpload: File = null;
	picture: string;
	filepath: string;
	iconPath= `${environment.IconUrl}`;
	bannerImg: string;
  loadingImg= false;


  form: FormGroup;
  _id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
	blog:any;
  blogimg:string;
  icons:any;
  Allicons:any;


  @Input() item = null;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private HomePageService: HomePageService,
	private http: HttpClient,
  ) { this.route.params.subscribe(params => this.blog = params._id)}

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    // this.isAddMode = !this.item;

	if(this.item == null){
		this.isAddMode = true
	}else{
		this.isAddMode = false;
	}
    this.form = this.buildForm();
    this.updateFormValue();
	this.getallicons()	
  }

  getallicons(){
	this.HomePageService.getIcons().subscribe(Allicons=>{this.Allicons =Allicons;})
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      isactive: [''],
      image: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

    private updateFormValue(): void {
      if (!this.isAddMode) {
        this.HomePageService.getHomeSlideImage(this.item).subscribe(
			data => {this.blog = data
        	this.filepath = `${environment.IconUrl}` + this.blog.data.image;
         	this.f.isactive.setValue(this.blog.data.isactive);
			this.f.image.setValue(this.blog.data.image);
			this.f.title.setValue(this.blog.data.title);
			}
		  )
    	}
    }
	
	progressImage: number;
	upFile(file): void {
		this.loading=true
		this.progressImage = 1;
		const formData = new FormData();
		formData.append("file", file);
		this.http.post(`${environment.saveicons}`, formData, {
			reportProgress: true,
			observe: "events"
		  }).pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				this.progressImage = Math.round((100 / event.total) * event.loaded);
			  } else if (event.type == HttpEventType.Response) {
				this.picture = event.body.data.newfilename;
				this.filepath = `${environment.IconUrl}` + this.picture;
				this.progressImage = null;
				this.loading=false
			  }
			}),
			catchError((err: any) => {
			  this.progressImage = null;
			  this.loading=false
			  alert(err.message);
			  return throwError(err.message);
			})
		  )
		  .subscribe();
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
        this.createBlog();
    } else {
        this.updateBlog();
    }
  }

  private createBlog() {
    this.HomePageService.AddHomeSlide(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Image added successfully', { keepAfterRouteChange: true });
                setTimeout(() => {
					location.reload()
				}, 1000);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}

	private updateBlog() {
		this.HomePageService.UpdateHomeSlide(this.item, this.form.value)
			.pipe(first())
			.subscribe(
				data => {
					this.alertService.success('Image Update successfull', { keepAfterRouteChange: true });
					setTimeout(() => {
						location.reload()
					}, 1000);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}



  
  upIconFile(file): void {
		this.progressImage = 1;
		const formData = new FormData();
		formData.append("file", file);
		this.http.post(`${environment.saveicons}`, formData, {
			reportProgress: true,
			observe: "events"
		  }).pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				this.progressImage = Math.round((100 / event.total) * event.loaded);
			  } else if (event.type == HttpEventType.Response) {
				this.picture = event.body.data.newfilename;
				this.progressImage = null;

				var form = {
					"title":this.picture ,
					"isactive": true,
					"description":"description"
				}
				this.HomePageService.AddIcon(form).pipe(first()).subscribe(
				data => {
					this.alertService.success('Icon added successfully');
					this.getallicons()
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
			  }
			}),
			catchError((err: any) => {
			  this.progressImage = null;
			  alert(err.message);
			  return throwError(err.message);
			})
		  )
		  .subscribe();
	}


	deleteIcon(_id): void {
        if (confirm("Are you sure you want to delete ?")){
           this.HomePageService.DeletetIcon(_id).subscribe(
            data => {
                this.alertService.success('Image Deleted successfully');
                this.getallicons()
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
	}

	geticon(id){
		this.filepath = `${environment.IconUrl}` + id
		this.picture = id;

	}
}