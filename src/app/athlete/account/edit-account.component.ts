import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { catchError, first, map } from 'rxjs/operators';
import {  AccountService, AlertService, AthleteService, UploadService, SportsService } from '@app/_services';
import { environment as env} from '@environments/environment';
import { Athlete } from '@app/_models/athlete.class';
import { HttpClient, HttpEventType, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
@Component({
  templateUrl: './edit-account.component.html',
  styleUrls: ['../layout.component.scss']
})
export class EditAccountComponent implements OnInit {

	@ViewChild('resumeInput', {  static: false  }) resumeInput; 
    selectedFile: File = null;  
    lstFileDetails: any;  
    athlete: Athlete;
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    user: any;
    skills: FormArray;
    pic:any;
    picture:any;
    filepath:any;
    sports:any;
    imageUrl: string;
	progressImage: number;

    constructor(
		private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private sportsService: SportsService,
        private athleteService: AthleteService,
        private uploadService: UploadService,
        private http: HttpClient,
    ) { }
    ngOnInit(){
        this.accountService.user.subscribe(x => this.user = x);
        this.filepath= `${env.imgUrl}`+this.user.profile_pic;
        this.id = this.user.id;
        this.isAddMode = !this.id;
        this.sportsService.getAllSports().subscribe((sports) => (this.sports = [...sports]));
        this.form = this.buildForm();
        this.updateFormValue();
    }
        
	get f() { return this.form.controls; }

    private buildForm(): FormGroup {
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }
		return this.formBuilder.group({
            profile_pic: [''],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            contact: ['', Validators.required],
            gender: ['', Validators.required],
            password: ['', passwordValidators],
            sports_id: ['', Validators.required],
            age: ['', Validators.required],
        });
    }
    selectedSports:any;
    private updateFormValue(): void {
        this.athleteService.getAthleteById(this.id).subscribe((athlete: Athlete) => {
            this.athlete = { ...athlete };
            this.filepath= `${env.imgUrl}`+this.athlete.profile_pic
            this.f.profile_pic.setValue(this.athlete.profile_pic);
            this.f.username.setValue(this.athlete.username);
            this.f.firstname.setValue(this.athlete.firstname);
            this.f.lastname.setValue(this.athlete.lastname);
            this.f.email.setValue(this.athlete.email);
            this.f.gender.setValue(this.athlete.gender);
            this.f.contact.setValue(this.athlete.contact);
            this.f.password.setValue(this.athlete.password);
            this.f.age.setValue(this.athlete.age);
            
            this.selectedSports = this.athlete.sports;
		   
            let csv_selected_ids='';
            this.selectedSports.forEach(function (elementVal) {
              csv_selected_ids+= elementVal._id + ',';
            });
  
            if(csv_selected_ids != ''){
              csv_selected_ids=csv_selected_ids.slice(0,-1);
              this.selectedSports = csv_selected_ids.split(',');
            }
        });
      
    }
  
    upFile(): void {
		this.loading=true
		this.progressImage = 1;
		const formData = new FormData();
		formData.append("file", this.resumeInput.nativeElement.files[0]);
		this.http.post(`${env.imgUpload}`, formData, {
			reportProgress: true,
			observe: "events"
		  })
          .pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				this.progressImage = Math.round((100 / event.total) * event.loaded);
			  } else if (event.type == HttpEventType.Response) {
				this.progressImage = null;
                this.picture= event.body.newfilename
                this.filepath= `${env.imgUrl}`+this.picture
                this.loading = false;
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
        this.alertService.clear();
        if (this.form.invalid) {return;}
        this.loading = true;
		this.updateUser();
    }
    profile_pic:any
    private updateUser() {
        this.athleteService.updateAthlete(this.id, this.form.value).pipe(first()).subscribe(
        data => {
            this.alertService.success('Pofile Updated successful', { keepAfterRouteChange: true });
            this.router.navigate(['/account']);
            this.loading=false;
            setTimeout(() => {
                location.reload()
            }, 300);

        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }

     
}


