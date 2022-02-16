import { Component, OnInit,Input } from '@angular/core';
import { AccountService, AlertService, AthleteService, DashboardService } from '@app/_services';
// import { Coaches } from '@app/_models/coach.class';
import * as Highcharts from 'highcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Athlete } from '@app/_models/athlete.class';

@Component({
  templateUrl:'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
	@Input() name: string;
    users = null;
    athlete: any;
    coach: any;
    PandingAthlete:any;
    loading=false;
    filepath:any;

    form: FormGroup;
    id: string;
    isAddMode: boolean;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private atheleteService: AthleteService, 
        // private coachService: CoachService, 
        private alertService: AlertService,
        private modalService: NgbModal,
        private DashboardService: DashboardService,
        private accountservice: AccountService
        ) {}
  
  ngOnInit() {
    this.filepath = `${environment.imgUrl}`
    this.getAllAthlete();
    this.getPayments();
}

history:any;
month:any=[];
amount:any=[];
getPayments(){
    this.accountservice.PaymentHistory().pipe(first()).subscribe(data=> {
        this.history = data;
        for (let x of this.history.data) {
            this.amount.push(x.amount)
            this.month.push(x.id)
        }
        var chart = Highcharts.chart("container", this.chartOptions );
    })
}

	chartOptions: Highcharts.Options = {
        chart:{
            type: 'spline',
            backgroundColor:'#F1F8DB',
			renderTo:'container',
        },
		title: null,
        
        xAxis: {
            categories: this.month
        },

        yAxis: {
            labels: {
                enabled: false
            },
            title: {
                text:null
            }
        },

        plotOptions: {
            series: {
                cursor: 'pointer',
                enableMouseTracking: true,
				marker:{
					lineColor: '#9ECA01'
				},
            }
        },
            
        tooltip: {
            headerFormat: '<b>Earning In {point.x}.</b><br />',
            pointFormat: '${point.y}'
        },

        series: [{
            type: 'spline',
            name: 'Earning Chart',
            data: this.amount,
            pointStart: 0,
            marker: {
                symbol: 'circle',
            },
            color: '#9ECA01',
        }]
	};


    private getAllAthlete(): void {
        this.atheleteService.getAllAthletes().subscribe(athlete => {        
            this.athlete = athlete;
        });
    }
/*
    private getPandingAthletes(){
        this.atheleteService.getAllAthletes().subscribe(PandingAthlete =>{this.PandingAthlete = PandingAthlete})
    }
    private getAllCoach(): void {
        this.coachService.getAllCoaches().subscribe((coach: Coaches[]) => {
            this.coach = coach;
        });
    }
 
    athleteID:string;
    Updateathlete:any;
    UpdateCoach:any;
    coach_id:any;
    newpath:any;
    newname:any;
    newsports:any;
    newcontact:any;
    openModel(assignCoach , athleteID) {
        this.modalService.open(assignCoach, { size: 'sm' });
        this.id = athleteID;
        this.isAddMode = !this.id;
        this.atheleteService.getAthleteById(this.id).subscribe((Updateathlete: Athlete) => {
        	this.Updateathlete = { ...Updateathlete }
			this.newpath= `${environment.imgUrl}`+this.Updateathlete.profile_pic
			this.newname= this.Updateathlete
    	});
    }
    createCoachID(){
        this.UpdateCoach = {
            "age": this.Updateathlete.age,
            "coach_id": this.coach_id,
            "contact": this.Updateathlete.contact,
            "email": this.Updateathlete.email,
            "gender": this.Updateathlete.gender,
            "name": this.Updateathlete.name,
            "profile_pic": this.Updateathlete.profile_pic,
            "sports_id": this.Updateathlete.sports.id,
            "username": this.Updateathlete.username,
        }
    }
    
    assignCoachToAthlete() {
        console.log( this.id ,this.UpdateCoach)
        this.atheleteService.updateAthlete(this.id, this.UpdateCoach).pipe(first()).subscribe(
        data => {
            this.alertService.success('Coach Assigned successfull', { keepAfterRouteChange: true });
            this.modalService.dismissAll()
            this.getPandingAthletes();
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }
    */
}
