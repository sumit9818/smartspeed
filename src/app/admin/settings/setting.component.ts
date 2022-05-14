import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AccountService, AlertService, AthleteService, SettingsService } from '@app/_services';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";


@Component({
    selector: 'app-setting',
     templateUrl: 'setting.component.html',
     styleUrls: ['setting.component.scss']
    })
export class SettingComponent implements OnInit{
    filepath= `${environment.imgUrl}`
    
    form:FormGroup  ;
    
    loading = false;
    Ploading = false;
	submitted = false;
    picture:any;
	
    progressImage: number;
	progressVideo: number;
    
    logo:any;
    isAddMode:any;

    constructor(
        private formBuilder:FormBuilder,
        private accoutservice:AccountService,
        private alertService:AlertService,
		private http: HttpClient,
		private SettingsService: SettingsService,
		private atheleteService: AthleteService,
    ) {}

    adminID:any;
    admin:any;
    ngOnInit() {
        this.adminID= JSON.parse(localStorage.getItem('smartuser')).id
		this.isAddMode = !this.adminID;
        this.SettingsService.GetLogo().subscribe(logo => {this.logo = logo;})

		this.form = this.buildForm()
		this.updateFormValue()
	}

    get f() { return this.form.controls; }

    private buildForm(): FormGroup {
        const passwordValidators = [Validators.minLength(6)];
        if(this.isAddMode){
            passwordValidators.push(Validators.required);
        }
        

		return this.formBuilder.group({
            name: [''],
            email: [''],
            username: [''],
            // contact: [''],
            password: ['', passwordValidators],
		});
	}
    

    
	
	private updateFormValue(): void {
        this.atheleteService.getAthleteById(this.adminID).subscribe((data:any) => {
        // this.accoutservice.updateAdmin(this.adminID).subscribe((data:any) => {
            this.admin = data;
            // console.log(this.admin)
            this.f.name.setValue(this.admin.name);
            this.f.username.setValue(this.admin.username);
            this.f.email.setValue(this.admin.email);
            // this.f.contact.setValue(this.admin.contact);
            this.f.password.setValue(this.admin.password);
        });
    }

    onSubmit(): void {
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) return;
        this.loading = true;
        this.updateUser()
    }
    
    private updateUser(){
        return this.accoutservice.updateAdmin(this.form.value).pipe(first()).subscribe(
			data => {
				this.alertService.success('Pofile Updated', { keepAfterRouteChange: true });
				this.loading=false;
			},
			error => {
				this.alertService.error(error);
				this.loading = false;
			});
    }
    
      upFile(file): void {
		this.progressImage = 1;
		const formData = new FormData();
		formData.append("file", file);
		this.http.post(`${environment.imgUpload}`, formData, {
			reportProgress: true,
			observe: "events"
		  }).pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				this.progressImage = Math.round((100 / event.total) * event.loaded);
			  } else if (event.type == HttpEventType.Response) {
				this.picture = event.body.newfilename;
				this.progressImage = null;
                var newlogo = {isactive:true,logo:this.picture}
                this.SettingsService.AddLogo(newlogo).subscribe(
                    data => {
                        this.alertService.success('Icon added successfully');
                        this.SettingsService.GetLogo().subscribe(logo=>{this.logo =logo;})
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
    
}