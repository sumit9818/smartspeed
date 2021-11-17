import { HttpClient} from '@angular/common/http';
import { Component,  OnInit,Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormsModule} from '@angular/forms';
import { AccountService, ChartService } from '@app/_services';
import { environment as env} from '@environments/environment';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import * as $ from 'jquery'; 

@Component({
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderBoardComponent implements OnInit {
	@Input() name: string;
    
    url = `${env.apiUrl}`;
	user:any;
	filepath:any;
    assessments:any;
    assessmentData:any;
    FirstID:any;
    changeassment:any;
    AthleteChart:any;
    showchart= 'hide';
    date:any;
    time:any;
    speed:any;
    video:any;
    thumbnail:any;
    constructor(
        private accountService: AccountService,
        private modalService: NgbModal,
        private http: HttpClient,
        private chart: ChartService
      ){
       
      }

    ngOnInit(): void {
        this.filepath =`${env.imgUrl}` 
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
        
        this.http.get(this.url+`/athlete/assessment/all`).subscribe(
            assessments => {this.assessments = assessments
            for(let FirstID of this.assessments.data){
                this.FirstID = FirstID;
                break;
            }
            this.changeassment = this.FirstID.id
            this.http.get(this.url+`/athlete/assessment/sprints/`+this.FirstID.id).subscribe(
                assessmentData => {this.assessmentData = assessmentData
                }
            )
            this.getAssessmentData(this.FirstID)
            
        })
       

	}

    viewDataModel(charttype){
        var markers = document.getElementsByClassName('highcharts-markers');
        for(let x of Array.from(markers)){
            x.addEventListener('click', function(){
                document.getElementById('show-video').classList.add('show')
                document.getElementsByClassName('v-date')[0].innerHTML = document.getElementsByClassName('date')[0].textContent;
                if(charttype == true){
                    document.getElementsByClassName('v-time')[0].innerHTML = document.getElementsByClassName('time')[0].textContent;
                }else{
                    document.getElementsByClassName('v-time')[0].innerHTML = ''
                }
                
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
    }

    returnZero() {
		return 0
	}
    selectedValue:any;
    getDropDownText(id, object) {
        const selObj = _.filter(object, function (o) {
            return (_.includes(id, o.id));
        });
        return selObj;
    }

    getAssessmentData(id){
        this.selectedValue = parseInt((this.getDropDownText(this.changeassment, this.assessments.data)[0].assessment));
        this.http.get(this.url+`/athlete/assessment/sprints/${id}`).subscribe(
            assessmentData => {this.assessmentData = assessmentData
        })

        this.http.get(this.url + `/athlete/assessment/charts/` + this.changeassment ).subscribe(
            AthleteChart => {this.AthleteChart = AthleteChart;
               
                if (this.AthleteChart.message != 'There is no data') {
                    this.showchart = 'showchart'
                   
                    if (isNaN(this.selectedValue)) {
                        this.chart.JumpChart(this.AthleteChart.data.xAxis, this.AthleteChart.data.data)
                        this.viewDataModel(false)
                        
                    }else{
                        this.chart.Chart(this.AthleteChart.data.xAxis, this.AthleteChart.data.data);
                        this.viewDataModel(true)
                    }
                } else {
                    this.showchart = 'hide'
                }
            }
        )
    }

    getDays(days){
        this.http.get(this.url+`/athlete/assessment/charts/${this.changeassment}?days=${days}` ).subscribe(
            AthleteChart => {this.AthleteChart = AthleteChart;
                if (this.AthleteChart.message != 'There is no data'){
                    this.showchart = 'showchart'
                    
                    if (isNaN(this.selectedValue)) {
                        this.chart.JumpChart(this.AthleteChart.data.xAxis, this.AthleteChart.data.data);
                        this.viewDataModel(false)
                    }else{
                        this.chart.Chart(this.AthleteChart.data.xAxis, this.AthleteChart.data.data);
                        this.viewDataModel(true)
                    }
                }else{
                    this.showchart = 'hide'
                }
            }
        )
    }

	open(video) {
		this.modalService.open(video, { size: 'sm' });
	}
	openAssementModal(assementModal) {
		this.modalService.open(assementModal, { size: 'md' });
	}
}

