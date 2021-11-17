import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AlertService, SettingsService } from '@app/_services';
import { first, tap } from 'rxjs/operators';
@Component({
    selector: 'app-meta',
     templateUrl: 'meta.component.html',
     styleUrls: ['setting.component.scss']
    })
export class MetaTagsComponent implements OnInit{

    form:FormGroup
    loading = false;
	submitted = false;
    metatags:any;
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
            description: [''],
            og_title: [''],
            og_description: ['', Validators.required],
            og_sitename: ['', Validators.required],
		});
	}

     private updateFormValue(): void {
          this.SettingsService.GetMetaTags().subscribe(metatags => {
            // console.log('ss',metatags)
            this.metatags = metatags;
            this.f.description.setValue(this.metatags.data.description);
            this.f.og_title.setValue(this.metatags.data.og_title);
            this.f.og_description.setValue(this.metatags.data.og_description);
            this.f.og_sitename.setValue(this.metatags.data.og_sitename);
          });
    }

    onSubmit(): void {
        console.log(this.form.value)
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) return;
        this.loading = true;
        this.updateTags()
      }
    
      private updateTags(){
        this.SettingsService.AddMetaTags(this.form.value).pipe(first()).subscribe(
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