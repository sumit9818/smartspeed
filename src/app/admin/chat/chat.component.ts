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
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss']
})
export class ChatComponent implements OnInit {

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
	loadingchats = false;
	form: FormGroup;
	submitted = false;
	users:any
	email:any;
	useremail:any;
	id:any;
	readed = false;
	userid:any;
	newusers:any;
	allusers:any;
	usersbtn=false;
	name:any;
	phone:any;
	chats:any;
	newchats:any;
  	ngOnInit() {
		this.form = this.buildForm();
		this.getChatUser()
		this.checkuser()
  	}
	  checkuser(){
		  setInterval(()=>{
			if(this.router.url === '/admin/chat'){
				this.EmailService.ChatUser().pipe(first()).subscribe(
					newusers=>{
						this.newusers = newusers;
						if (JSON.stringify(this.newusers.data) != JSON.stringify(this.users.data)) {
							this.users = this.newusers;
							console.log(this.newusers.data)
						}else{
							// console.log('this.newusers.data')
							console.log('works')
						}
					}
				)
				if(this.id != undefined){
					this.EmailService.GetChatMessage(this.id).pipe(first()).subscribe(
						newchats => {
							this.newchats = newchats;
							if (JSON.stringify(this.newchats.data) != JSON.stringify(this.chats.data)) {
								this.chats = this.newchats;
								this.cdRef.detectChanges();
								setTimeout(() => {
									this.EmailService.ReadChat(this.id).pipe(first()).subscribe()
								}, 2000);
							}else{
								// console.log('chat')
							}
							
						}
					)
				}
				  
			}	
		  }, 2000)
	}
	getChatUser(){
		this.usersbtn = false;
		this.EmailService.ChatUser().pipe(first()).subscribe(
			users=>{
				this.users = users;
			}
		)	
	}

	getAllChatUser(){
		this.usersbtn = true;
		this.EmailService.GetAllChatUser().pipe(first()).subscribe(
			allusers=>{
				this.allusers = allusers;
				// console.log(this.allusers)
			}
		)	
	}
	
	viewChat(id , name , phone, email ){
		this.loadingchats = true;
		this.email = email;
		this.name = name;
		this.phone= phone;
		this.id= id;
		document.querySelectorAll(".programs").forEach(element => {
			element.classList.remove('active')
		});
		document.getElementById(id).classList.add('active')
		this.EmailService.GetChatMessage(id).pipe(first()).subscribe(
			chats => {
				this.chats = chats;
				this.loadingchats = false;
				// console.log(this.chats)
				this.cdRef.detectChanges();
			}
		  )
		  this.EmailService.ReadChat(id).pipe(first()).subscribe()

	  }

	open(Modal, useremail) {
		this.useremail = useremail; 
        this.modalService.open(Modal, { size: 'md' });
    }


	private buildForm(): FormGroup {
        return this.formBuilder.group({
            user_id: [''],
            message: ['', Validators.required],
        });
      }

      onSubmit(): void {
        this.submitted = true;
        console.log(this.form.value)
        this.alertService.clear();
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.submitChat()
	}

	private submitChat() {
        return this.EmailService.SendChatMessage(this.form.value).subscribe((data) => {
            this.loading = false;
			this.viewChat(this.id, this.email , this.phone, this.name);
			// $('#message').val(null)
			// $("body").animate({ scrollTop: $("body")[0].scrollHeight}, 1000);
          },
			error => {
				this.alertService.error(error);
              	this.loading = false;
			}
		)
	}

}

