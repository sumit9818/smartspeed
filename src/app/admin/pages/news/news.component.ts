import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, BlogService } from '@app/_services';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'news.component.html',
    // styleUrls: ['add-edit.component.scss'] 
 })
export class BlogComponent implements OnInit{
    filepath = `${environment.imgUrl}`
    constructor(
        private route: ActivatedRoute, 
        private BlogService: BlogService, 
        private alertService:AlertService) {
    }

    blogs:any;
    ngOnInit() {
        this.BlogService.getAllBlog().pipe(first()).subscribe(
            blogs => {this.blogs = blogs}
        )
    }

    deleteBlog(_id): void {
        if (confirm("Are you sure you want to delete ?")){
           this.BlogService.deleteBlog(_id).subscribe(
            data => {
                this.alertService.success('Blog Deleted successfully');
                this.BlogService.getAllBlog()
                .pipe(first())
                .subscribe(blogs => this.blogs = blogs);
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
       }
  
}