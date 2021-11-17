import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Athlete } from '@app/_models/athlete.class';
import { AlertService, AthleteService, ProgramService } from '@app/_services';
import { Program } from '@app/_models/program.model';
import { tap } from 'rxjs/operators';
import { ProgramHeader } from '@app/_models/program-header.class';
import { ProgramNewServiceResponse } from '@app/_models/program-new-response.model';

@Component({ 
    templateUrl: 'add-edit.component.html',
    styleUrls: ['./program.component.scss']
 })
export class ProgramAddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    athlete: Athlete[] = [];
    selectedAthletes: any = [];
    settings: {};
    program: any;
	subtitles:[];
    config = {
        dialogsInBody: true,
        placeholder: '',
        tabsize: 2,
        height: '350px',
    };

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private athleteService: AthleteService,
        private programService: ProgramService,
        private alertService: AlertService
    ) {}


    ngOnInit(){
        this.athleteService.getAllAthletes().subscribe((athlete: Athlete[]) => this.athlete = [...athlete]);

        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.buildForm();
        this.updateFormValue();
    }

    onItemSelect(item:any){
      console.log(item.id);
  }


	addPhone(): void {
		(
			this.form.get('subtitles') as FormArray).push(
			this.formBuilder.control(null)
		);
	}

	removePhone(index) {
		(this.form.get('subtitles') as FormArray).removeAt(index);
	}

    

	getPhonesFormControls(): AbstractControl[] {
		return (<FormArray> this.form.get('subtitles')).controls
	}
	
	get f() { return this.form.controls }

    private buildForm(): FormGroup {
        return this.formBuilder.group({
            isactive: [''],
            athletes: [this.selectedAthletes],
            title: [''],
            // instruction: ['']
            subtitles: this.formBuilder.array([
				this.formBuilder.control(null)
			])
        });
    }
	
    private updateFormValue(): void {
        if (!this.isAddMode) {
            this.programService.getProgramById(this.id).subscribe((data: any) => {
				this.removePhone(0)
				
				this.program = data;
				console.log(this.program.subtitles)
                this.f.isactive.setValue(this.program.isactive);
                this.selectedAthletes = this.program.athletes;
                this.f.title.setValue(this.program.title);
                
				this.program.subtitles.forEach(element => {
					(
						this.form.get('subtitles') as FormArray).push(
						this.formBuilder.control(element)
					);
				});

				let csv_selected_ids='';
				this.selectedAthletes.forEach(function (elementVal) {
					csv_selected_ids+= elementVal._id + ',';
				});


				if(csv_selected_ids != ''){
					csv_selected_ids=csv_selected_ids.slice(0,-1);
					this.selectedAthletes = csv_selected_ids.split(',');
				}
            });
        }
    }

    onSubmit(): void {
        console.log(this.form.value);
        console.log(this.form);
        
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.form.invalid) return;
        this.loading = true;

        this.submitProgram().subscribe(() => {
            this.router.navigate(['/admin/program', { relativeTo: this.route }]);
          },
          (error) => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }

    private submitProgram(): Observable<ProgramNewServiceResponse | ProgramHeader> {
        return this.isAddMode ? this.createProgram() : this.updateProgram();
      }
    
      private createProgram(): Observable<ProgramNewServiceResponse> {
        return this.programService.addProgram(this.form.value).pipe(
          tap(() => {
            this.alertService.success('Program added successfully', {
              keepAfterRouteChange: true,
            });
          })
        );
      }
    
      private updateProgram(): Observable<ProgramHeader> {
        return this.programService.updateProgram(this.id, this.form.value).pipe(
          tap(() => {
              this.alertService.success('Program Update successful', {
                keepAfterRouteChange: true,
              });
            })
        );
      }

}