import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';
import { environment as env } from '@environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	public isMenuCollapsed:boolean = true;
	
    user=null;
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    logo:any;
    filepath=`${env.imgUrl}`
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private modalService: NgbModal,
        private http: HttpClient,
        ) {
            if (this.accountService.userValue) { 
            this.accountService.user.subscribe(x => this.user = x);
		}
    }


	ngOnInit(): void {
		this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
		
		this.getLogo()
		const self = this;

		window.addEventListener('scroll', function() { 
		let scrollpos = window.scrollY;

		if (scrollpos > 50) {
			self.add_class_on_scroll();
		} else {
			self.remove_class_on_scroll();
		}
		});
  	}

 	add_class_on_scroll() {
		const header:any = document.getElementById("brand");
		header.classList.add("fade-in");
	}
	remove_class_on_scroll() {
		const header:any = document.getElementById("brand");
		header.classList.remove("fade-in");
	}


	  getLogo(){
		this.http.get(`${env.apiUrl}/website/logo`).subscribe(
			logo=>this.logo=logo
		)
	  }


	  get f() { return this.form.controls; }
	  onSubmit() {
		  this.submitted = true;
		  this.alertService.clear();
		  if (this.form.invalid) {
			  return;
		  }
		  this.loading = true;
		  this.accountService.login(this.f.username.value, this.f.password.value)
			  .pipe(first())
			  .subscribe(
				  data => {
					  this.accountService.user.subscribe(x => this.user = x);
					  this.modalService.dismissAll();
					  if(this.user.roles.name === 'Admin'){
						  this.router.navigate(['/admin']);
					  }
					  if(this.user.roles.name === 'Athlete'){
						  this.router.navigate(['/account']);
					  }
				  },
				  error => {
					  this.alertService.error(error);
					  this.loading = false;
				  });
	  }
	  
	  logout() {
		  this.accountService.logout();
		  location.reload()
		//   this.alertService.success('Logut  successfully', { keepAfterRouteChange: true });
	  }
	  open(LoginModal) {
		  this.modalService.open(LoginModal, { size: 'sm' });
	  }
	  openSignUp(SignUPModal) {
		  this.modalService.open(SignUPModal, { size: 'lg' });
	  }
}
