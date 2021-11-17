import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray  } from '@angular/forms';
import { AlertService, EmailService } from '@app/_services';
import { environment } from '@environments/environment';

import { tap } from 'rxjs/operators';
@Component({
    selector: 'app-footer',
     templateUrl: 'footer.component.html',
     styleUrls: ['footer.component.scss']
    })
export class FooterComponent implements OnInit{
    
    
    socialMedia:any;
    sendquery:any;
    loading = false;
    form: FormGroup;
	submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private EmailService: EmailService,
        private alertService: AlertService,
        ) {}

    ngOnInit() {
        this.http.get(`${environment.apiUrl}/website/social`).subscribe(socialMedia=>{this.socialMedia=socialMedia;console.log(this.socialMedia.data)});
        
        this.form = this.buildForm();
		setTimeout(() => {
			$('#insta').append(`<div data-mc-src="f05ffeba-5a6c-41b7-8af5-7483cdd51296#instagram"></div>
			<script  src="https://cdn2.woxo.tech/a.js#60096cbe44647b0015c0673c"  async data-usrc></script>`)
		}, 3000);
     }
     get f() {
        return this.form.controls;
      }
     private buildForm(): FormGroup {
        return this.formBuilder.group({
            subject: ['New Query'],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            body: ['', Validators.required],
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
        this.submitquery()
      }

      private submitquery() {
        return this.EmailService.sendEmail(this.form.value).subscribe((data) => {
            this.loading = false;
            this.alertService.success('Message Send successfull', {
              keepAfterRouteChange: true,
            });
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          })
      }

}