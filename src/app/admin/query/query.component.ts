import { Component, OnInit, ViewChild ,Input, ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { AlertService, EmailService, SportsService} from '@app/_services';
import { SportDetails } from '@app/_models/sport-header.model';
import { first } from 'rxjs/operators';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollToBottomDirective } from '@app/scroll-to-bottom.directive';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
@Component({
  templateUrl: 'query.component.html',
  styleUrls: ['query.component.scss']
})
export class UserQueryComponent implements OnInit {

  constructor(
	private formBuilder: FormBuilder,
    private alertService: AlertService,
    private EmailService: EmailService,
    private modalService: NgbModal,
    private router: Router,
	private cdRef:ChangeDetectorRef,
  ) {}
  	@ViewChild(ScrollToBottomDirective)
  	scroll: ScrollToBottomDirective;

	filepath = `${environment.imgUrl}`;
	loading = false;
	form: FormGroup;
	submitted = false;
	users:any
	email:any;
	useremail:any;
	id:any;
	readed = false;
	userid:any;
	newusers:any;
	setid:any;
	loadingemail=false
  	ngOnInit() {
		this.form = this.buildForm();
		this.getEmailUser()
		this.checkuser()
  	}
	  checkuser(){
		//   setInterval(()=>{
			if(this.router.url === '/admin/query'){
				this.EmailService.getEmailUser().pipe(first()).subscribe(
					newusers=>{
						this.newusers = newusers;
						if (JSON.stringify(this.newusers.data) != JSON.stringify(this.users.data)) {
							this.users = this.newusers;
							
						}else{
						}
					}
				)}	
		//   }, 2000)
	  }
	  getEmailUser(){
		this.EmailService.getEmailUser().pipe(first()).subscribe(
			users=>{
				this.users = users;
			}
		)	
	  }
	  viewEmail(id){
		this.id= id;
		document.querySelectorAll(".programs").forEach(element => {
			element.classList.remove('active')
		});
		document.getElementById(id).classList.add('active')
		// console.log(id)
		this.loadingemail =true
		  this.EmailService.getEmail(id).pipe(first()).subscribe(
			email => {
				this.email = email;
				this.loadingemail =false
				this.cdRef.detectChanges();
				
				// console.log(id)
			}
		  )
		  this.EmailService.Read(id).pipe(first()).subscribe()
	  }

	open(Modal, useremail) {
		this.useremail = useremail; 
        this.modalService.open(Modal, { size: 'md' });
    }


	private buildForm(): FormGroup {
        return this.formBuilder.group({
            subject: ['', Validators.required],
            name: ['Admin'],
            to: [''],
            body: ['', Validators.required],
        });
      }

      onSubmit(): void {
        this.submitted = true;
        // console.log(this.form.value)
        this.alertService.clear();
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.submitquery()
	}

	private submitquery() {
        return this.EmailService.ReplyEmail(this.form.value).subscribe((data) => {
            this.loading = false;
            this.alertService.success('Message Send successfull', {
              keepAfterRouteChange: true,
            });
			this.modalService.dismissAll();
			this.viewEmail(this.id);
          },
			error => {
            	  this.alertService.error(error);
              	this.loading = false;
			}
		)
	}

	deleteQuery(_id): void {
        if (confirm("Are you sure you want to delete ?")){
			// console.log(_id)
           this.EmailService.EmailDelete(_id).subscribe(
            data => {
                this.alertService.success('Deleted successfully', { keepAfterRouteChange: true });
                // this.EmailService.getAllFaq()
                // .pipe(first())
                // .subscribe(faq => this.faq = faq);
				
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
       }
}