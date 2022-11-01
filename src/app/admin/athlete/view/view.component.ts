import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Athlete } from '@app/_models/athlete.class';
import { AlertService, AssessmentService, AthleteService, CoachService, PricingService, SportsService, UploadService } from '@app/_services';
import { environment as env } from '@environments/environment';
import { Chart } from 'highcharts';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import { ViewAthleteProgramsComponent } from '../program/program.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import * as $ from 'jquery'; 

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class AthleteDetailsComponent implements OnInit {
	@ViewChild(ViewAthleteProgramsComponent) childReference;
	athlete:any;
	id:string;
	filepath= `${env.imgUrl}`
	subscriptions:any;
	plan:any;
	subscriptionID:any;
	pricing:any;
	currentplan:any;
	status:string;

	ViewAssessment:boolean = false;
	ViewProgram:boolean = false;
	assessments:any;
	Chart:any;
	changeassment:any;
	assessmentData:any;

  	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private sportsService: SportsService,
		private coachService: CoachService,
		private uploadService: UploadService,
		private atheleteService: AthleteService,
		private PricingService: PricingService,
		private http: HttpClient,
		private AssessmentService: AssessmentService,
	) { 
		
	}

	ngOnInit(): void {
		this.id= this.route.snapshot.params['id']
		this.getDetails(this.id)
		this.getAllPlans();

		var close = document.getElementsByClassName('close');

		for(let x of Array.from(close)){
			x.addEventListener('click', function(){
				document.getElementById('show-video').classList.remove('show')
			});
		}
		$('body').keydown(function(e){
			if(e.keyCode == 27){
				document.getElementById('show-video').classList.remove('show')
			}
		});

	}

	fixedplan:any;
	package:any;
	getDetails(id){
		this.atheleteService.getAthleteById(id).subscribe((athlete: Athlete) => {
			this.athlete = { ...athlete };
			if(this.athlete.membership === 'lifetime'){
				this.fixedplan = JSON.parse(this.athlete.transactions) 
				this.PricingService.getAllOneTimePricing().subscribe((x:any)=>{
					let d:any = x
					this.package = d.data.filter((i:any)=>i._id === this.athlete.package_id)
				})
				
				
			}
		})
	}

	getAllPlans(){
		this.PricingService.getAllSubscription().pipe(first()).subscribe(
            subscriptions => {
				this.subscriptions = subscriptions;
				
				for (let X of this.subscriptions.data) {
					if(X?.user_id){
						if(this.id === X?.user_id?._id){
							this.getsubsctiptiondetails(X.subscription_id);
							this.status = X.status
						}
					}
					
				}
				
        }
        )
    }
	getsubsctiptiondetails(id){
        this.PricingService.getSubscriptionByID(id).pipe(first()).subscribe(
            subscription => {this.plan = subscription
                this.http.get(`${env.apiUrl}/website/pricing/all`).subscribe(pricing => { 
                    this.pricing = pricing; 
                    this.pricing.data.map(currentplan=>{
                        if(currentplan.plan_id === this.plan.data.plan_id){
                            this.currentplan = currentplan
                        }
                    })
                })
            }
		)
    }

    returnZero() {
		return 0
	}

	ShowAssessment(){
		if(this.ViewAssessment == false){
			this.ViewAssessment = true;
			this.ViewProgram = false;
		}
		this.getAssessment()
	}
	ShowProgram(){
		if(this.ViewProgram == false){
			this.ViewAssessment = false ;
			this.ViewProgram = true;
		}
	}


	getAssessment(){
		this.AssessmentService.getAthletesAllAssesment(this.id).subscribe(
			data => {
				this.assessments = data;
		})
	}

	date:any;
	time:any;
	speed:any;
	video:any;
	index:any;
	getChart(assment, id){
		this.AssessmentService.getAthletecharts(assment, id).subscribe(
            data => {
			this.Chart = data;
            this.CreateChart()
			var markers = document.getElementsByClassName('highcharts-markers');

			for(let x of Array.from(markers)){
				x.addEventListener('click', function(){
					document.getElementById('show-video').classList.add('show')

					document.getElementsByClassName('v-date')[0].innerHTML = document.getElementsByClassName('date')[0].textContent;
					document.getElementsByClassName('v-time')[0].innerHTML = document.getElementsByClassName('time')[0].textContent;
					document.getElementsByClassName('v-speed')[0].innerHTML = document.getElementsByClassName('speed')[0].textContent;

					if(document.getElementsByClassName('vid')[0].textContent === ''){
						document.getElementsByClassName('v-video')[0].innerHTML = 'No Video Found'
					}else{
						document.getElementsByClassName('v-video')[0].innerHTML=`<video src="${env.imgUrl+document.getElementsByClassName('vid')[0].textContent}" 
						controls style="width:100%" poster="${env.imgUrl+document.getElementsByClassName('poster')[0].textContent}"></video>`
					}

					
				});
					break;
			}
        })
	}

	ChangeAssessmentData(){
        this.selectedValue = parseInt((this.getDropDownText(this.changeassment, this.assessments.data)[0].assessment));
		this.AssessmentService.getAthleteAssesment(this.changeassment,this.id).subscribe(
            data => {this.assessmentData = data;
		})
		this.getChart(this.changeassment,this.id)
	}


	selectedValue:any;
    getDropDownText(id, object) {
        const selObj = _.filter(object, function (o) {
            return (_.includes(id, o.id));
        });
        return selObj;
    }

	getDays(days){
        this.AssessmentService.getAthleteAssesmentDays(this.changeassment,this.id, days).subscribe(
            AthleteChart => {this.Chart = AthleteChart;
		})
		this.getChart(this.changeassment,this.id)
    }
	
    CreateChart(){
		var newdata = [];
		var tt;
		if (isNaN(this.selectedValue)) {
			for(let x of this.Chart.data.data){
				newdata.push({
					"y": parseInt(x.jump.match(/\d+/g)),
					"marker": x.marker,
					"date": x.date,
					"jump": x.jump,
					"video": x.video,
					"thumbnail": x.thumbnail
				})
			}
			tt = '<p style="margin-bottom: 8px;font-weight: 600;"><span class="date">Date: {point.date}</span></br><span class="speed">Distance: {point.jump}</span> <span class="vid" style="display:none;">{point.video}</span><span class="poster" style="display:none;">{point.thumbnail}</span></p><p class="w-vid"  style="color:#9ECA01;margin-bottom: 0px">View</p>'
			
		}else{
			newdata = this.Chart.data.data;
			tt =  '<p style="margin-bottom: 8px;font-weight: 600;"><span class="index hide">{point.index}</span><span class="date">Date: {point.date}</span></br><span class="speed">Speed: {point.speed}</span> In <span class="time">{point.time}</span><span class="vid" style="display:none;">{point.video}</span><span class="poster" style="display:none;">{point.thumbnail}</span></p><p class="w-vid"  style="color:#9ECA01;margin-bottom: 0px">View</p>'
		}
		
        Highcharts.chart('chart', {
            chart:{
                type: 'spline',
                backgroundColor:'#F1F8DB',
                renderTo:'container',
            },
            title: null,
            xAxis: { categories: this.Chart.data.xAxis },
            yAxis: {
				labels: {
					enabled: false
				},title: null},
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
				useHTML: true,
				headerFormat: '',
				pointFormat: tt,
			},
            series: [{
                type: 'spline',
                name: 'Stats Chart',
                data: newdata,
                pointStart: 0,
                marker: {
                    symbol: 'circle',
                },
                color: '#9ECA01',
            }]

        })
    }



}
