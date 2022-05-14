import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormsModule} from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AccountService, AlertService, UploadService } from '@app/_services';
import { environment } from '@environments/environment';
import { Observable, pipe } from 'rxjs';
import { HttpClient,HttpEventType } from '@angular/common/http';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";
import * as _ from 'lodash';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { NumberFormatStyle } from '@angular/common';

@Component({
    selector: 'app-addassessment',
  templateUrl: './add.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class AddAthleteAssessmentComponent implements OnInit {
    videos:any;
    imageUrl: string;
    fileToUpload: File = null;
    progressImage: number;
	progressVideo: any;
    VideoUrl: string;
    VideofileToUpload: File = null;

	
    picture: any;
    filepath: string;
    
    VideoFile: any;
    Videofilepath: string;

	loadingImg = false;

    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    settings: {};
    video:any;
    assessments:any;
    config = {
      dialogsInBody: true,
      placeholder: '',
      tabsize: 2,
      height: '200px',
    };
    
    datePickerConfig :any
	assementModel:any;
	selectedValue: any;
	timing:any;
	run="hide"
	jump="hide"
	
	hours:any;
	KM:any;
	secs:any;
    
      
    constructor(
		private formBuilder: FormBuilder,
		private accountService: AccountService,
		private http: HttpClient,
		private modalService: NgbModal,
		private alertService: AlertService,
        private uploadService: UploadService,
      ){
    }

    date=new Date();

    ngOnInit():void{

        this.form = this.buildForm();
         this.accountService.getAthleteAssessment().pipe(first()).subscribe(
            assessments => {
				this.assessments = assessments
        })
         var newdate = moment(this.date).format('YYYY/MM/DD')
        this.datePickerConfig = {
            format: 'YYYY/MM/DD',
            showNearMonthDays: false,
            max:newdate,
          }
	}

	getDropDownText(id, object) {
		const selObj = _.filter(object, function (o) {
			return (_.includes(id, o.id));
		});
		return selObj;
	}

	

	getNumber(){
		const selectedValue = this.getDropDownText(this.assementModel, this.assessments.data)[0];
		
		this.selectedValue = parseInt((this.getDropDownText(this.assementModel, this.assessments.data)[0].assessment));
		// console.log(this.selectedValue)
		if (isNaN(this.selectedValue)){
			this.run = "hide"
			this.jump = "show"
		}else{
			this.run= "show"
			this.jump= "hide"
			this.init()
		}
	}

	init() {
		let distance = this.selectedValue / 1000;
        let time = (0 * 3600 + 0 * 60 + this.secs) / 3600;
		this.KM = distance / time;
		if(this.KM != Infinity &&  !isNaN(this.KM)){
			this.hours = parseFloat(this.KM).toFixed(2);
			// console.log((this.KM).length)
		}else{
			this.hours = ''
		}
	}



    upImageFile(file): void {
		this.loading=true
		this.progressImage = 1;
		const formData = new FormData();
		formData.append("file", file);
		this.http.post(`${environment.imgUpload}`, formData, {
			reportProgress: true,
			observe: "events"
		  }).pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				this.progressImage = Math.round((100 / event.total) * event.loaded);
			  } else if (event.type == HttpEventType.Response) {
				this.picture = event.body.newfilename;
				this.filepath = `${environment.imgUrl}` + this.picture;
				// console.log(event)
				this.progressImage = null;
				this.loading=false
			  }
			}),
			catchError((err: any) => {
			  this.progressImage = null;
			  this.loading=false
			  alert(err.message);
			  return throwError(err.message);
			})
		  )
		  .subscribe();
        
	}
  
	upVideoFile(file): void {
		this.loading=true
		this.progressVideo = 1;
		const formData = new FormData();
		formData.append("file", file);
	
		this.http.post(`${environment.imgUpload}`, formData, {
			reportProgress: true,
			observe: "events"
		  }).pipe(map((event: any) => {
			  if (event.type == HttpEventType.UploadProgress) {
				  this.progressVideo = Math.round((100 * event.loaded) / event.total) + `%`;
				  if (this.progressVideo === "100%") {
					  this.progressVideo = 'Please Wait'
				  }
				//   console.log(this.progressVideo)
			  } else if (event.type == HttpEventType.Response) {
				  this.VideoFile = event.body.newfilename;
				  this.Videofilepath = `${environment.imgUrl}` + this.VideoFile;
				  this.progressVideo = null;
				  this.loading = false
			  }
			}),
			catchError((err: any) => {
			  this.progressVideo = null;
			  this.loading=false
			  alert(err.message);
			  return throwError(err.message);
			})
		  )
		  .subscribe();
	}

    get f() { return this.form.controls }
    

    private buildForm(): FormGroup {
        return this.formBuilder.group({
            assessment_id: ['' , Validators.required],
            date: ['' , Validators.required],
            speed: [''],
            time: [''],
            jump: [''],
            thumbnail_image: [''],
            video_url: [''],
        });
    }

    onSubmit(): void {
        // console.log(this.form.value);
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) return;
        this.loading = true;
        this.createAssessmentData();
    }
    

    private createAssessmentData() {
        this.accountService.addAthleteAssessmentData(this.form.value)
        .pipe(first())
        .subscribe(
            (data:any) => {
                if(data.success === true){
                  this.alertService.success('Assessment added successfully', { keepAfterRouteChange: true });
                  this.modalService.dismissAll();
                  location.reload()
                }else{
                  this.alertService.error(data.message);
                  this.loading =false
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
        });
    }
    
}
