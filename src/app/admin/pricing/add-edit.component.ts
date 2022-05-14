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
	blog:any;
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
  	) { this.route.params.subscribe(params => this.blog = params._id)}

	ngOnInit() {
		this._id = this.route.snapshot.params['id'];
		this.isAddMode = !this._id;
		this.blogimg = `${environment.imgUrl}`
		
		this.form = this.buildForm();
		this.updateFormValue();
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls }
	minNum = 1;
  	private buildForm(): FormGroup {
	const control = new FormControl(9, Validators.min(10));
	// const passwordValidators = [Validators.min(1)];
	return this.formBuilder.group({
		isactive: [true],
		title: ['', Validators.required],
		price: ['', [Validators.required, Validators.min(this.minNum)]],
		month: ['', Validators.required],
		plan_id: [''],
		description: ['', Validators.required],
		});
	}

    private updateFormValue(): void {
      if (!this.isAddMode) {
        this.PricingService.getPricingByID(this._id).subscribe(
			data => {this.blog = data
			this.f.isactive.setValue(this.blog.data.isactive);
			this.f.plan_id.setValue(this.blog.data.plan_id);
         	this.f.price.setValue(this.blog.data.price);
			this.f.title.setValue(this.blog.data.title);
			this.f.month.setValue(this.blog.data.month);
			this.f.description.setValue(this.blog.data.description);

			}
			
		  )
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

		private updatePricing() {
			this.PricingService.updatePricing(this._id, this.form.value)
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
		}

		
/**
     * 
     * 
Product name:First Product
Product description:just for testing purpose only
Product ID:PROD-7MV92953T14921018
Product type:Digital goods
Product page URL:http://brothertechnologies.com/smartadmin/website
Industry category:Commercial sports - professional sports clubs, and sports promoters
*/
subs = {
	"product_id": "PROD-7MV92953T14921018",
	"name": "InterMediat Plan 09",
	"description": "InterMediat plan",
	"billing_cycles": [
	  {
		"frequency": {
		  "interval_unit": "MONTH",
		  "interval_count": 1
		},
		"tenure_type": "TRIAL",
		"sequence": 1,
		"total_cycles": 1
	  },
	  {
		"frequency": {
		  "interval_unit": "MONTH",
		  "interval_count": 1
		},
		"tenure_type": "REGULAR",
		"sequence": 2,
		"total_cycles": 12,
		"pricing_scheme": {
		  "fixed_price": {
			"value": "10",
			"currency_code": "USD"
		  }
		}
	  }
	],
	"payment_preferences": {
	  "auto_bill_outstanding": true,
	  "setup_fee": {
		"value": "10",
		"currency_code": "USD"
	  },
	  "setup_fee_failure_action": "CONTINUE",
	  "payment_failure_threshold": 3
	},
	"taxes": {
	  "percentage": "10",
	  "inclusive": false
	}
  }
}