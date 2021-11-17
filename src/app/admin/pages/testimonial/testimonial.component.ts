import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, TestimonialsService } from '@app/_services';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';
@Component({
    templateUrl: 'testimonial.component.html',
    // styleUrls: ['add-edit.component.scss'] 
 })
export class TestimonialComponent implements OnInit{
    filepath: string;
    constructor(private route: ActivatedRoute,
        private testimonialService: TestimonialsService,
        private alertService : AlertService) {
            this.filepath = `${environment.imgUrl}`;
    }


    testimonials:any;
    ngOnInit() {
        this.testimonialService.getAllTestimonial().pipe(first()).subscribe(
            testimonials => {this.testimonials = testimonials
            console.log(this.testimonials)}
        )
    }
    deleteTestimonial(_id): void {
        if (confirm("Are you sure you want to delete ?")){
           this.testimonialService.deleteTestimonial(_id).subscribe(
            data => {
                this.alertService.success('Testimonials Deleted successfully', { keepAfterRouteChange: true });
                this.testimonialService.getAllTestimonial()
                .pipe(first())
                .subscribe(testimonials => this.testimonials = testimonials);
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
       }
  
}