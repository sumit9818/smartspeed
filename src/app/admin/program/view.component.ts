import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramService } from '../../_services';
import { environment } from '../../../environments/environment';
import { Program } from '../../_models/program.model';
@Component({
    templateUrl: 'view.component.html',
    // styleUrls: ['add-edit.component.scss'] 
 })
export class ProgramViewComponent implements OnInit{
    program: Program;
    filepath: string;
    boigraphy: string;
    id: string;

    constructor(private route: ActivatedRoute, private programService: ProgramService) {
        this.filepath= `${environment.imgUrl}`;
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.getProgramById(this.id);
    }

    private getProgramById(id: string): void {
        this.programService.getProgramById(id).subscribe((program: Program) => 
        {this.program = {...program}
        }
        );
    }
    
}