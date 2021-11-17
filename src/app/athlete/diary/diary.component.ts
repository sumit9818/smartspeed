import { HttpClient} from '@angular/common/http';
import { Component,  OnInit,Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormsModule} from '@angular/forms';
import { AccountService, AlertService } from '@app/_services';
import { environment } from '@environments/environment';

import * as Highcharts from 'highcharts';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery'; 
import { first, tap } from 'rxjs/operators';

@Component({
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
	@Input() name: string;
    form: FormGroup;
    loading = false;
    submitted = false;
    
	filepath:any;
  diary:any;
    FirstID:any;
    changeassment:any;
    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private modalService: NgbModal,
        private http: HttpClient,
        private alertService: AlertService,
      ){}
    ngOnInit(): void {
    	this.Diary()

        this.form = this.buildForm();
	}
    returnZero() {
		return 0
	}

	Diary(){
		this.accountService.getAthleteDiary().pipe(first()).subscribe(
			diary => {this.diary = diary
				// console.log(this.diary)
			})
	}

    get f() {
        return this.form.controls;
      }
    private buildForm(): FormGroup {
        return this.formBuilder.group({
            title: ['']
        });
    }

    onSubmit(): void {
        console.log(this.form.value);
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.form.invalid) return;
        this.loading = true;
        this.submitDairy().subscribe(() => {},
          (error) => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
        
    }
    private submitDairy(){
        return this.accountService.AddAthleteDiary(this.form.value).pipe(
            tap(() => {
				this.Diary();
				this.form.reset()
                this.alertService.success('Note Added successfully', {
                  keepAfterRouteChange: true,
                });
              })
          );
    }
	
    deleteFaq(_id): void {
        if (confirm("Are you sure you want to delete ?")){
           this.accountService.deleteDiary(_id).subscribe(
            data => {
                this.alertService.success('Note Deleted successfully', { keepAfterRouteChange: true });
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
       }
}

