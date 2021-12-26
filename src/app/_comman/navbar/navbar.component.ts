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

		

		var scrollpos = window.scrollY;
		var header = document.getElementById("brand");

		function add_class_on_scroll() {
			header.classList.add("fade-in");
		}
		function remove_class_on_scroll() {
			header.classList.remove("fade-in");
		}

		window.addEventListener('scroll', function(){ 
			scrollpos = window.scrollY;

			if(scrollpos > 50){
				add_class_on_scroll();
			}
			else {
				remove_class_on_scroll();
			}
		});
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
						  location.reload()
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
