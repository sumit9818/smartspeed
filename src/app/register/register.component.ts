import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
import { Athlete } from '@app/_models/athlete.class';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterAthleteComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  athlete: Athlete;
  pricing: any;
  Beginner:number;
  Intermediate:number;
  sports:any;
  sports_name:any;
  user:any;
  firstname:string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    private AccountService: AccountService,
	private modalService: NgbModal,
  	) {}

  	ngOnInit():void {
		  
        this.http.get(`${environment.apiUrl}/website/pricing/all`).subscribe(pricing=>{this.pricing = pricing;})
		this.http.get(`${environment.apiUrl}/sports/all`).subscribe(sports=>{this.sports = sports})
		this.form = this.buildForm();
  	}

  // convenience getter for easy access to form fields
  get f() {
	return this.form.controls;
  }


  private buildForm(): FormGroup {
    const passwordValidators = [Validators.minLength(6)];
	passwordValidators.push(Validators.required);
	return this.formBuilder.group({
		firstname :[ '', Validators.required],
		lastname :['', Validators.required ],
		username: ['', Validators.required],
		age: ['', Validators.required],
		gender: ['', Validators.required],
		email: ['', Validators.required],
		password: ['', passwordValidators],
		sports_id: [''],
		level: ['', Validators.required],
		aimlevel: ['', Validators.required],
		best_suits: ['', Validators.required],
    });
  }
  onSubmit(): void {
    this.submitted = true;
	// console.log(this.form.value)
    this.alertService.clear();
    if (this.form.invalid) {return;}
    ///console.log(this.form.value)
    this.loading = true; 
	this.createUser();
  }

  	private createUser() {
    	this.AccountService.RegisterAthlete(this.form.value).pipe(first()).subscribe(
            data => {
                this.alertService.success('Account Created Successfully', { keepAfterRouteChange: true });
                setTimeout(()=>{
                  window.location.reload()
                  // this.modalService.dismissAll();
                  // this.AccountService.login(this.form.value.username, this.form.value.password).pipe(first()).subscribe(
                  //   data => {
                  //     this.AccountService.user.subscribe(x => this.user = x);
                  //     this.modalService.dismissAll();
                  //     this.router.navigate(['/ask'])
                  //   },
                  //   error => {
                  //     this.alertService.error(error);
                  //     this.loading = false;
                  //   });
                },1500)
				     
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
	}

}

