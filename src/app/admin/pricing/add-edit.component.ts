import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AlertService, PricingService } from '@app/_services';
import { environment } from '@environments/environment';
@Component({
  templateUrl: 'add-edit.component.html',
  styleUrls: ['pricing.component.scss'],
})
export class PricingAddEditComponent implements OnInit {
  form: FormGroup;
  _id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
	pricing:any;
	typeOfPlan:any;
  blogimg:string;

  config = {
		dialogsInBody: true,
		placeholder: '',
		tabsize: 2,
		height: '300px',
	};

  	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private PricingService: PricingService,
  	) { 
		this.route.params.subscribe(params => this.pricing = params._id)
	}
	plantype(event:any){
		this.form =null;
		this.typeOfPlan = event;
		this.form = this.buildForm();
	}

	ngOnInit() {
		if(!this.route.snapshot.params['id']){
			this.isAddMode = !this._id;
			this.plantype('')
		}else{
			this._id = this.route.snapshot.params['id'].split('&&');
			this.isAddMode = !this._id[1];
			if(this._id[0] === 'montlhy'){
				this.plantype('');
			}else{
				this.plantype('onetime')
			}
		}
		
		
		this.updateFormValue();
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls }
	minNum = 1;
  	private buildForm(): FormGroup {
	const control = new FormControl(9, Validators.min(10));
	// const passwordValidators = [Validators.min(1)];
	if(this.typeOfPlan === 'onetime'){
		return this.formBuilder.group({
			isactive: [true],
			title: ['', Validators.required],
			price: ['', [Validators.required, Validators.min(this.minNum)]],
			plan_type: ['onetime'],
			description: ['', Validators.required],
			});
	}else{
		return this.formBuilder.group({
			isactive: [true],
			title: ['', Validators.required],
			price: ['', [Validators.required, Validators.min(this.minNum)]],
			month: ['', Validators.required],
			plan_id: [''],
			description: ['', Validators.required],
			});
		}
	}

	

    private updateFormValue(): void {
      if (!this.isAddMode) {
		if(this.typeOfPlan === 'onetime'){
			{
			this.PricingService.getOneTimePricingByID(this._id[1]).subscribe(
			data => {
				this.pricing = data
				this.f.isactive.setValue(this.pricing.data.isactive);
				this.f.plan_type.setValue(this.pricing.data.plan_type);
				this.f.price.setValue(this.pricing.data.price);
				this.f.title.setValue(this.pricing.data.title);
				this.f.description.setValue(this.pricing.data.description);
			})
			}
		}
        else{
			this.PricingService.getPricingByID(this._id[1]).subscribe(
			data => {this.pricing = data
			this.f.isactive.setValue(this.pricing.data.isactive);
			this.f.plan_id.setValue(this.pricing.data.plan_id);
			this.f.price.setValue(this.pricing.data.price);
			this.f.title.setValue(this.pricing.data.title);
			this.f.month.setValue(this.pricing.data.month);
			this.f.description.setValue(this.pricing.data.description);
			})
			}
		}
    }
    

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid

    this.loading = true;
    if (this.isAddMode) {
        this.createPricing();
    } else {
        this.updatePricing();
    }
  }

  private createPricing() {
	if(this.typeOfPlan === 'onetime'){
		this.PricingService.AddOneTimePricing(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Packages added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['/admin/pricing']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
	}else{
    this.PricingService.AddPricing(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Packages added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['/admin/pricing']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
		}
	}

		private updatePricing() {
			if(this.typeOfPlan === 'onetime'){
				this.PricingService.updateOneTimePricing(this._id[1], this.form.value)
				.pipe(first())
				.subscribe(
					data => {
						this.alertService.success('Update successfull', { keepAfterRouteChange: true });
						this.router.navigate(['/admin/pricing']);
					},
					error => {
						this.alertService.error(error);
						this.loading = false;
			});
			}else{this.PricingService.updatePricing(this._id[1], this.form.value)
				.pipe(first())
				.subscribe(
					data => {
						this.alertService.success('Update successfull', { keepAfterRouteChange: true });
						this.router.navigate(['/admin/pricing']);
					},
					error => {
						this.alertService.error(error);
						this.loading = false;
			});}
		}
}