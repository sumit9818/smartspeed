import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AccountService, AlertService, AthleteService, CoachService, SportsService, UploadService } from '@app/_services';
import { environment } from '@environments/environment';
import { SportDetails } from '@app/_models/sport-header.model';
import { Coaches } from '@app/_models/coach.class';
import { Athlete } from '@app/_models/athlete.class';
import { Observable } from 'rxjs';
import { AthleteNewServiceResponse } from '@app/_models/athlete-new-response.model';
@Component({
  templateUrl: 'add-edit.component.html',
  styleUrls: ['./athlete.component.scss'],
})
export class AthleteAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  sports: SportDetails[] = [];
  coach: any;
  athlete: Athlete;

  picture: string;
  loadingfile:boolean;
	onpictureChange(picture: string) {
		this.picture = picture;
    console.log(picture)
	}
	onloadingfileChange(loadingfile: boolean) {
		this.loadingfile = loadingfile;
	}

  // filepath: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private sportsService: SportsService,
    private coachService: CoachService,
    private uploadService: UploadService,
    private AccountService: AccountService,
    private atheleteService: AthleteService
  ) {}

  ngOnInit() {
    this.sportsService.getAllSports().subscribe((sports) => (this.sports = [...sports]));
    // this.coachService.getAllCoaches().subscribe((coach) => (this.coach = [...coach]));

    this.coachService.getAllCoaches().pipe(first()).subscribe(coach => {this.coach = coach})

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.buildForm();
    this.updateFormValue();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

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
		// coach_id: ['', Validators.required],
		level: ['', Validators.required],
		aimlevel: ['', Validators.required],
		best_suits: ['', Validators.required],
      	age: ['', Validators.required],
    });
  }
  selectedSports:any;
  private updateFormValue(): void {
    if (!this.isAddMode) {
      this.atheleteService.getAthleteById(this.id).subscribe((athlete: Athlete) => {
          this.athlete = { ...athlete };
          //console.log(this.athlete)
          // this.filepath= `${environment.imgUrl}`+this.athlete.profile_pic
          this.f.profile_pic.setValue(this.athlete.profile_pic);
          this.f.firstname.setValue(this.athlete.firstname);
          this.f.lastname.setValue(this.athlete.lastname);
          this.f.username.setValue(this.athlete.username);
          this.f.email.setValue(this.athlete.email);
          this.f.gender.setValue(this.athlete.gender);
          this.f.contact.setValue(this.athlete.contact);
          this.f.password.setValue(this.athlete.password);
          this.f.age.setValue(this.athlete.age);
          this.f.level.setValue(this.athlete.level);
          this.f.aimlevel.setValue(this.athlete.aimlevel);
          this.f.best_suits.setValue(this.athlete.best_suits);

		  this.selectedSports = this.athlete.sports;
		  let csv_selected_ids='';
			this.selectedSports.forEach(function (elementVal) {
				csv_selected_ids+= elementVal._id + ',';
			});

			if(csv_selected_ids != ''){
				csv_selected_ids=csv_selected_ids.slice(0,-1);
				this.selectedSports = csv_selected_ids.split(',');
			}

          // this.f.coach_id.setValue(this.athlete.coach.id);
        });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {return;}
    // console.log(this.form.value)
    this.loading = true;
    this.submitUser()
  }

  private submitUser() {
    return this.isAddMode ? this.createUser() : this.updateUser();
  }

  private createUser() {
	this.AccountService.RegisterAthlete(this.form.value).pipe(first()).subscribe(
		data => {
			this.router.navigate(['/admin/athlete']);
			this.alertService.success('Athlete added successfully', {
				keepAfterRouteChange: true,
				
			  });
		},
		error => {
			this.alertService.error(error);
			this.loading = false;
		});


    // return this.atheleteService.addAthlete(this.form.value).pipe(
    //   tap((data:any) => {
    //     this.alertService.success('Athlete added successfully', {
    //       keepAfterRouteChange: true,
    //     });
    //   })
    // );
  }


  private updateUser(): any {
    return this.atheleteService.updateAthlete(this.id, this.form.value).pipe(first()).subscribe(
		data => {
			this.router.navigate(['/admin/athlete']);
			this.alertService.success('Athlete Updated successfully', {
				keepAfterRouteChange: true,
			  });
		},
		error => {
			this.alertService.error(error);
			this.loading = false;
		});
  }

}