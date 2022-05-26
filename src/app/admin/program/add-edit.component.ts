import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
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
	subtitles: [];
	steps: any = [];
	config = {
		dialogsInBody: true,
		placeholder: '',
		tabsize: 2,
		height: '350px',
	};

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private athleteService: AthleteService,
		private programService: ProgramService,
		private alertService: AlertService
	) {
		
	}
	// get all videos


	get f() { return this.form.controls }
	
	private buildForm(): FormGroup {
		return  this.fb.group({
            isactive: ['',Validators.compose([Validators.required])],
            title: ['',Validators.compose([Validators.required])],
			data: this.fb.array([])
        });
	}
	private updateFormValue(): void {
        if (!this.isAddMode) {
            this.programService.getProgramById(this.id).subscribe((data: any) => {
				this.program = data;
				console.log(this.program)
				this.f.isactive.setValue(this.program.isactive);
				this.f.title.setValue(this.program.title);
				this.addGroup(data);
            });
        }
    }

	ngOnInit() {
		this.athleteService.getAllAthletes().subscribe((athlete: Athlete[]) => this.athlete = [...athlete]);
		this.id = this.route.snapshot.params['id'];
		this.isAddMode = !this.id;

		this.form = this.buildForm()
        this.updateFormValue();
	}

	addInstruction(userIndex: number, data?: any) {
		let fg = this.fb.group({
			'title': [data ? data.title : '', Validators.compose([Validators.required])],
			'status': [data ? data.status : false],
		});

		(<FormArray>(<FormGroup>(<FormArray>this.form.controls.data)
			.controls[userIndex]).controls['instruction']).push(fg);
	}

	deleteInstruction(userIndex: number, index: number) {
		(<FormArray>(<FormGroup>(<FormArray>this.form.controls.data)
			.controls[userIndex]).controls['instruction']).removeAt(index);
	}

	addGroup(data?: any) {
		if (!data) {
			let fg = this.fb.group({
				'instructionTitle': [data ? data.instructionTitle : '', Validators.compose([Validators.required])],
				'videoLink': [data ? data.videoLink : ''],
				'instruction': this.fb.array([]),
			});
			(<FormArray>this.form.get('data')).push(fg);
			
			let userIndex = (<FormArray>this.form.get('data')).length - 1;
			this.addInstruction(userIndex);
		}
		else {		
			data.data.forEach(instructions => {
				let fg = this.fb.group({
					'instructionTitle': [data ? instructions.instructionTitle : '', Validators.compose([Validators.required])],
					'videoLink': [data ? instructions.videoLink : ''],
					'instruction': this.fb.array([]),
				});
				(<FormArray>this.form.get('data')).push(fg);
				
				let userIndex = (<FormArray>this.form.get('data')).length - 1;
				instructions.instruction.forEach(x => {
					this.addInstruction(userIndex, x);
				})
			});
		}
	}

	deleteGroup(index: number) {
		(<FormArray>this.form.get('data')).removeAt(index);
	}

	onCancle() {
		this.form.reset();
		console.log(this.form, this.form.value);
	}

	onSubmit(): void {
        this.submitted = true;
		// console.log(this.form.value)
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