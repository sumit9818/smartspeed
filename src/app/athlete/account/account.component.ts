import { Component, OnInit } from '@angular/core';
import { AccountService, AthleteService } from '@app/_services';
import { environment } from '@environments/environment';
import { first } from 'rxjs/operators';
@Component({
  templateUrl: './account.component.html',
  styleUrls: ['../layout.component.scss']
})
export class AccountComponent implements OnInit {

    filepath:any;
    user:any;
    athlete:any;
	subscription:any;
	plan:any;
    constructor(
      private accountService: AccountService,
      private AthleteService: AthleteService
      ){
    }
    ngOnInit(){
        this.accountService.user.subscribe(x => this.user = x);
        this.filepath= `${environment.imgUrl}`
        this.AthleteService.getAthleteById(this.user.id).subscribe(
          athlete=> {
            this.athlete = athlete;
		      this.filepath= `${environment.imgUrl}`+this.athlete.profile_pic})
          
    }
    

}
