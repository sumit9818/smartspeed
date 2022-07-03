import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramService, VideoService } from '../../_services';
import { environment } from '../../../environments/environment';
import { Program } from '../../_models/program.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'view.component.html',
    styleUrls: ['./program.component.scss'] 
 })
export class ProgramViewComponent implements OnInit{
    program: Program;
	filepath = `${environment.imgUrl}`
    boigraphy: string;
    id: string;
    videos:any;

    constructor(private route: ActivatedRoute, private programService: ProgramService,
        private modalService: NgbModal,
        private videoservice: VideoService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.getProgramById(this.id);
        this.getvideo()
    }
    getvideo(){
		this.videoservice.getAllVideo().pipe(first()).subscribe(videos => {
			this.videos = videos
		})
	}
    private getProgramById(id: string): void {
        this.programService.getProgramById(id).subscribe((program: Program) => 
        {this.program = {...program}}
        );
    }
    
	  openModal(VideoModal:any) {
		this.modalService.open(VideoModal, { size: 'lg' });
	}
}