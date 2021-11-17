import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { AlertService, SportsService } from '@app/_services';
import { Observable } from 'rxjs';
import { SportNewServiceResponse } from '@app/_models/sport-new-response.model';
import { Sport } from '@app/_models/sport.model';

@Component({ 
    templateUrl: 'add-edit.component.html',
    styleUrls: ['add-edit.component.scss'] 
 })
export class SportAddEditComponent implements OnInit {
    form: FormGroup;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    sports: Sport;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private sportsService: SportsService
    ) {}

    ngOnInit() {

        this.sports = {
            id: this.route.snapshot.params['id'],
            name: this.route.snapshot.params['name']
        }
        this.isAddMode = !this.sports.id;

        this.form = this.buildForm();
        this.getSportById();
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls }

    private buildForm(): FormGroup {
        return this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    private getSportById(): void {
        if (!this.isAddMode)
            this.f.name.setValue(this.sports.name);
    }

    onSubmit(): void {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.submitSport().subscribe(() => {
            this.router.navigate(['/admin/sports', { relativeTo: this.route }]);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }

    private submitSport(): Observable<SportNewServiceResponse> {
        return this.isAddMode ? this.AddSports() : this.updateSports();
    }

    private AddSports(): Observable<SportNewServiceResponse> {
        return this.sportsService.addSports(this.form.value).pipe(
            tap(data => this.alertService.success('Sport added successfully', { keepAfterRouteChange: true }))
        );
    }

    private updateSports(): Observable<SportNewServiceResponse> {
        return this.sportsService.updateSport(this.sports.id, this.form.value).pipe(
            tap(data => this.alertService.success('Update successful', { keepAfterRouteChange: true }))
        );
    }
}