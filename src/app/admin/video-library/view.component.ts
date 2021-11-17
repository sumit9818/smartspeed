import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  VideoService } from '@app/_services';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Component({
    templateUrl: 'view.component.html',
    styleUrls: ['video.component.scss'] 
 })
export class ViewVideoComponent implements OnInit{
    video:any;
    id: string;
    filepath: string;
    constructor(private route: ActivatedRoute, private videoService: VideoService) {
        this.route.params.subscribe(params => this.video = params.id);
        this.filepath = `${environment.imgUrl}`
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
       this.videoService.getVideoByID(this.id).pipe(first()).subscribe(
        video => {this.video = video}
       )
    }

    
}