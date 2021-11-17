import { Component, OnInit } from '@angular/core';
import { AlertService, AthleteService } from '@app/_services';
import { environment } from '@environments/environment';
import { Athlete } from '@app/_models/athlete.class';
import { Response } from '@app/_models/delete-response.model';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss'],
})
export class AthleteComponent implements OnInit {
  athlete: Athlete[] = [];
  filepath: string;

  constructor(private atheleteService: AthleteService, private alertService: AlertService) {
    this.filepath = `${environment.imgUrl}`;
  }

  ngOnInit(): void {
    this.getAllAthletes();
  }

  private getAllAthletes(): void {
    this.atheleteService.getAllAthletes().subscribe((athlete: Athlete[]) => this.athlete = [...athlete]);
  }

  deleteAthlete(id: string): void {
    if (confirm('Are you sure you want to delete ?')) {
      this.atheleteService.deleteAthlete(id).subscribe((response: Response) => {
          this.alertService.success('Athlete Deleted successfully', {
            keepAfterRouteChange: true,
          });
          this.athlete = [...this.athlete.filter((ath) => ath.id !== id)];
        },
        (error) => {
          this.alertService.error(error);
        });
    }
  }
}
