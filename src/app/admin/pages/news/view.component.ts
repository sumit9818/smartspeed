import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '@app/_services';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'view.component.html',
    // styleUrls: ['add-edit.component.scss'] 
 })
export class BlogViewComponent implements OnInit{
    blog:any;
    _id: string;
    filepath:string;
    constructor(private route: ActivatedRoute, private BlogService: BlogService) {
        this.route.params.subscribe(params => this.blog = params._id);
    }

    ngOnInit() {
        this._id = this.route.snapshot.params['id'];
       this.BlogService.getBlogByID(this._id).pipe(first()).subscribe(
           blog => {this.blog = blog;
            this.filepath= `${environment.imgUrl}` +this.blog.data.image
            }
       )
    }

    
}