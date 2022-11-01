import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AlertService, AssessmentService, AthleteService, UploadService, VideoService } from '@app/_services';
import { environment } from '@environments/environment';
import { Observable, pipe } from 'rxjs';

@Component({ 
    templateUrl: 'add-edit.component.html',
    styleUrls: ['video.component.scss'] 
 })
export class AddVideoComponent implements OnInit {
	loadingfile:boolean;
	picture: string;
	onpictureChange(picture: string) {
		this.picture = picture;
	}
	onloadingfileChange(loadingfile: boolean) {
		this.loadingfile = loadingfile;
	}
    VideoFile: any;
	onVideoFileChange(VideoFile: string) {
		this.VideoFile = VideoFile;
	}


    filepath: string;

    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    athlete:any=[];
    selectedAthletes = [];
    settings: {};
	  video:any;
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
        private VideoService: VideoService,
        private alertService: AlertService,
        private uploadService: UploadService
    ) {}

    ngOnInit(){
      this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.athleteService.getAllAthletes().pipe(first()).subscribe(athlete => {
        let ath = athlete;
        this.athlete.push({
          "id": "allathele",
          "name": "All Athletes",})
        ath.map(data=>{
          this.athlete.push(data) 
      })
      if(!this.isAddMode){
        this.VideoService.getVideoByID(this.id).pipe(first()).subscribe(
          video=> {
            this.video = video;
            this.selectedAthletes = this.video.data.athletes;
            this.updateFormValue();
          })
        }
		})
		
        
        this.form = this.buildForm();
    }

    getathlete(){
      this.selectedAthletes.forEach(x=>{
        if(x ==='allathele'){
          this.selectedAthletes =[];
          this.athlete.forEach(a=>{
            if(a.id != 'allathele'){
              this.selectedAthletes.push(a.id)
            }
          })
        }
      })
    }
	
    get f() { return this.form.controls }
    
    private buildForm(): FormGroup {
        return this.formBuilder.group({
            isactive: [''],
            isadmin: [true],
            title: [''],
            thumbnail_image: [''],
            video_url: [''],
            description: [''],
            athletes: [this.selectedAthletes],
        });
    }

    private updateFormValue(): void {
        if (!this.isAddMode) {
            this.VideoService.getVideoByID(this.id).subscribe(data => {
				this.video = data;
                this.f.isactive.setValue(this.video.data.isactive);
                this.f.title.setValue(this.video.data.title);
                this.f.thumbnail_image.setValue(this.video.data.thumbnail_image);
                this.f.video_url.setValue(this.video.data.video_url);
                this.f.description.setValue(this.video.data.description);
				let csv_selected_ids='';
				this.selectedAthletes.forEach(function (elementVal) {
					csv_selected_ids+= elementVal.id + ',';
				});

				if(csv_selected_ids != ''){
					csv_selected_ids=csv_selected_ids.slice(0,-1);
					this.selectedAthletes = csv_selected_ids.split(',');
				}
            });
        }
    }
	// public val: string;
    onSubmit(): void {
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) return;
        this.loading = true;
        this.submitVideo().subscribe(() => {
            this.router.navigate(['/admin/video-library']);
          },
          (error) => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }

    private submitVideo(): Observable<any> {
        return this.isAddMode ? this.createVideo() : this.updateVideo();
      }
    
      private createVideo(): Observable<any> {
        return this.VideoService.AddVideo(this.form.value).pipe(
          tap(() => {
            this.alertService.success('Video added successfully', {
              keepAfterRouteChange: true,
            });
          })
        );
      }
    
      private updateVideo(): Observable<any> {
        return this.VideoService.updateVideo(this.id, this.form.value).pipe(
          tap(() => {
              this.alertService.success('Video Update successful', {
                keepAfterRouteChange: true,
              });
            })
        );
      }

}