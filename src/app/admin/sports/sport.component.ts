import { Component, OnInit } from '@angular/core';
import { AlertService, SportsService} from '@app/_services';
import { SportDetails } from '@app/_models/sport-header.model';

@Component({
  templateUrl: 'sport.component.html',
  // styleUrls: ['coach.component.scss']
})
export class SportComponent implements OnInit {
  sports: SportDetails[] = [];

  constructor(
    private alertService: AlertService,
    private sportsService: SportsService
  ) {}

  ngOnInit() {
    this.getAllSports();
  }

  private getAllSports(): void {
    this.sportsService.getAllSports().subscribe((sports: SportDetails[]) => (this.sports = [...sports]));
  }

  deleteSport(_id: string): void {
    if (confirm('Are you sure you want to delete ?')) {
      this.sportsService.deleteSport(_id).subscribe((data) => {
          this.alertService.success('Sports Deleted successfully', {keepAfterRouteChange: true});
          this.sports = [...this.sports.filter(sp => sp._id !== _id)];
        },
        (error) => {
          this.alertService.error(error);
        }
      );
    }
  }

}