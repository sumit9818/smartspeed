import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, BlogService, HomePageService } from '@app/_services';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'banner.component.html',
    styleUrls: ['banner.component.scss'] 
 })
export class BannerComponent implements OnInit{
    filepath = `${environment.imgUrl}`
    constructor(
        private route: ActivatedRoute, 
        private HomePageService: HomePageService, 
        private alertService:AlertService) {
    }

    slides:any;
    ngOnInit() {
        this.filepath = `${environment.imgUrl}`
        this.HomePageService.getHomeSlideAll().pipe(first()).subscribe(
            slides => {this.slides = slides
            // console.log(this.slides)
            }
        )
    }

    deleteSlide(_id): void {
        if (confirm("Are you sure you want to delete ?")){
           this.HomePageService.DeletetHomeSlideImage(_id).subscribe(
            data => {
                this.alertService.success('Image Deleted successfully');
                this.HomePageService.getHomeSlideAll()
                .pipe(first())
                .subscribe(slides => this.slides = slides);
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
       }
  
}