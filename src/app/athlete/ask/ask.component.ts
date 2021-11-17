import { Component, OnInit, ViewChild ,Input, ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { AlertService, EmailService, SportsService} from '@app/_services';
import { SportDetails } from '@app/_models/sport-header.model';
import { first } from 'rxjs/operators';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollToBottomDirective } from '@app/scroll-to-bottom.directive';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  templateUrl: 'ask.component.html',
  styleUrls: ['ask.component.scss']
})
export class AskComponent implements OnInit {

  constructor(
	private formBuilder: FormBuilder,
    private alertService: AlertService,
    private EmailService: EmailService,
    private modalService: NgbModal,
    private router: Router,
	private http: HttpClient,
	private cdRef:ChangeDetectorRef,
  ) {}
  	@ViewChild(ScrollToBottomDirective)
  	scroll: ScrollToBottomDirective;

	
	loading = false;
	form: FormGroup;
	submitted = false;
	user = JSON.parse(localStorage.getItem('smartuser'))
	chats:any;
  	ngOnInit() {
		this.viewChat()
		this.form = this.buildForm();
  	}
	 
	  

	viewChat(){
		this.http.get(`${environment.apiUrl}/chat/self`).pipe(first()).subscribe(
			chats => {
				this.chats = chats;
				this.cdRef.detectChanges();
			}
		  )
	}


	private buildForm(): FormGroup {
        return this.formBuilder.group({
            message: ['', Validators.required],
        });
      }

      onSubmit(): void {
        this.submitted = true;
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
			this.viewChat();
          },
			error => {
				this.alertService.error(error);
              	this.loading = false;
			}
		)
	}

}

