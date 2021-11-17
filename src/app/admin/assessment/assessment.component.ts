
import { Component, OnInit } from '@angular/core';
import { Assessment } from '@app/_models/assessment.model';
import { Response } from '../../_models/delete-response.model';
import { AlertService, AssessmentService } from '@app/_services';
import { environment } from '@environments/environment';
@Component({ 
    templateUrl: 'assessment.component.html',
 })

 export class AssessmentComponent implements OnInit {
   assessments: Assessment[] = [];
   filepath: string;
   loading = false;
   allathletes:any;
   athletes:any;
   constructor(private alertService: AlertService, private assessmentService: AssessmentService) {
      this.filepath= `${environment.imgUrl}`;
   }

   ngOnInit() {
      this.getAllAssessments();
   }
    private getAllAssessments(): void {
      	this.assessmentService.getAllAssessments().subscribe((assessments: Assessment[]) => {
			this.assessments = [...assessments]
			this.getassmentathlete(this.assessments[0].id);
      	});
    }
	
	getassmentathlete(id){
		this.assessmentService.getAssessmentById(id).subscribe(
			allathletes => {this.allathletes = allathletes
         	this.athletes = this.removeDuplicates(this.allathletes.data, "email");
			document.getElementById(id).classList.add('active')
         }
		)
		document.querySelectorAll(".programs").forEach(element => {
			element.classList.remove('active')
		});

	}

   removeDuplicates(originalArray, prop) {
     this.athletes = [];
     this.allathletes.data  = {};
   
      for(var i in originalArray) {
         this.allathletes.data[originalArray[i][prop]] = originalArray[i];
      }
   
      for(i in this.allathletes.data) {
         this.athletes.push(this.allathletes.data[i]);
      }
       return this.athletes;
   }
   
    deleteAssessment(id: string): void {
      if (confirm('Are you sure you want to delete ?')) {
         this.assessmentService.deleteAssessment(id).subscribe((response: Response) => {
            this.alertService.success('Assessment Deleted successfully', {keepAfterRouteChange: true});
              this.assessments = [...this.assessments.filter(asmnt => asmnt.id !== id)];
          },
         (error) => {
            this.alertService.error(error);
         });
      }
    }
   
}
