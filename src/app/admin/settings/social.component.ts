import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AlertService, SettingsService } from '@app/_services';
import { first, tap } from 'rxjs/operators';
@Component({
    selector: 'app-social',
     templateUrl: 'social.component.html',
     styleUrls: ['setting.component.scss']
    })
export class SocialComponent implements OnInit{

    form:FormGroup
    loading = false;
	submitted = false;
    social:any;
    constructor(
        private formBuilder:FormBuilder,
        private accoutservice:AccountService,
        private SettingsService:SettingsService,
        private alertService:AlertService,
    ) {}

    ngOnInit() {
		this.form = this.buildForm()
		this.updateFormValue()
     }

     get f() { return this.form.controls }

     private buildForm(): FormGroup {
		return this.formBuilder.group({
            facebook: [''],
            instagram: [''],
            linkedin: ['', Validators.required],
            twitter: ['', Validators.required],
		});
	}

     private updateFormValue(): void {
          this.SettingsService.GetSocial().subscribe(social => {
            this.social = social;
            this.f.facebook.setValue(this.social.data.facebook);
            this.f.instagram.setValue(this.social.data.instagram);
            this.f.linkedin.setValue(this.social.data.linkedin);
            this.f.twitter.setValue(this.social.data.twitter);
          });
    }

    onSubmit(): void {
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) return;
        this.loading = true;
        this.updateTags()
      }
    
      private updateTags(){
        this.SettingsService.AddSocial(this.form.value).pipe(first()).subscribe(
            data => {
                this.alertService.success('Updated successfully', { keepAfterRouteChange: true });
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
      }
    
    
}