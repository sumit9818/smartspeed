import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AlertService, AssessmentService, AthleteService } from '@app/_services';
import { Athlete } from '@app/_models/athlete.class';
import { Assessment } from '@app/_models/assessment.model';
import { Observable } from 'rxjs';

@Component({ 
    templateUrl: 'add-edit.component.html',
	styleUrls:['assessment.component.scss']
 })
export class AddAssessmentComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    settings: {};

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private assessmentService: AssessmentService,
        private alertService: AlertService,
    ) {}


    ngOnInit(){
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.buildForm();
        this.updateFormValue();
    }

    
    get f() { return this.form.controls }

    private buildForm(): FormGroup {
        return this.formBuilder.group({
            isactive: [''],
            type: [''],
            assessment: ['']
        });
    }

    private updateFormValue(): void {
        if (!this.isAddMode) {
            this.assessmentService.getAthleteByAssessment(this.id).subscribe((assessment: any) => {
				// this.selectedAthletes= assessment.athletes;
				console.log(assessment)
                this.f.isactive.setValue(assessment.isactive);
                this.f.type.setValue(assessment.type);
                this.f.assessment.setValue(assessment.assessment);
            });
        }
    }

    onSubmit(): void {
        console.log(this.form.value);
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.form.invalid) return;
        this.loading = true;

        this.submitAssessment().subscribe(() => {
            this.router.navigate(['/admin/assessment', { relativeTo: this.route }]);
          },
          (error) => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }

    private submitAssessment(): Observable<any> {
        return this.isAddMode ? this.createAssessment() : this.updateAssessment();
      }
    
      private createAssessment(): Observable<any> {
        return this.assessmentService.addAssessment(this.form.value).pipe(
          tap(() => {
            this.alertService.success('Assessment added successfully', {
              keepAfterRouteChange: true,
            });
          })
        );
      }
    
      private updateAssessment(): Observable<any> {
        return this.assessmentService.updateAssessment(this.id, this.form.value).pipe(
          tap(() => {
              this.alertService.success('Assessment Update successful', {
                keepAfterRouteChange: true,
              });
            })
        );
      }

}