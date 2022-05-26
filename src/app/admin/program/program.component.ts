import { Component, OnInit } from '@angular/core';
import { Response } from '@app/_models/delete-response.model';
import { AlertService } from '@app/_services';
import { Program } from '@app/_models';
import { ProgramService } from '@app/_services';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

	programs: Program[] = [];

	constructor(private programService: ProgramService, private alertService: AlertService) { }
  
	ngOnInit(): void {
	  this.getAllPrograms();
	}
  
	getAllPrograms(): void {
	  this.programService.getAllPrograms().subscribe((response: Program[]) => this.programs = [...response]);
	}
  
	deleteProgram(id: string): void {
	  if (confirm('Are you sure you want to delete ?')) {
		this.programService.deleteProgram(id).subscribe((data: Response) => {
			this.alertService.success('Program Deleted successfully', {keepAfterRouteChange: true});
			this.programs = [...this.programs.filter(prg => prg.id !== id)];
			this.getAllPrograms();
		  },
		  (error) => {
			this.alertService.error(error);
		  });
	  }
	}
  

}
