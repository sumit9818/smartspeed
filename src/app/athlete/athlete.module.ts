import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NgSelectModule } from '@ng-select/ng-select';
import { DpDatePickerModule } from 'ng2-date-picker';

import { AthleteRoutingModule } from './athlete-routing.module';
import { LayoutComponent } from './layout.component';
import { AccountComponent,EditAccountComponent } from './account';
import { AskComponent } from './ask/ask.component';
import { ProgramsComponent, ViewAthleteProgramComponent } from './programs';
import { DiaryComponent } from './diary/diary.component';
import { AddAthleteVideoComponent,VideoAthletesComponent,ViewAthleteVideoComponent } from './video';
import { AthleteSubscriptionsComponent } from './payment/list.component';
import { AddAthleteAssessmentComponent,LeaderBoardComponent } from './leaderbord';
import { PackageComponent } from './package/package.component';
import { UtcToLocalTimePipe } from './utc-to-local-time.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    AccountComponent,EditAccountComponent,
    AskComponent,
    ProgramsComponent, ViewAthleteProgramComponent,
    DiaryComponent,
    AddAthleteVideoComponent,VideoAthletesComponent,ViewAthleteVideoComponent,
    AthleteSubscriptionsComponent,
    AddAthleteAssessmentComponent,LeaderBoardComponent,
    PackageComponent,
    UtcToLocalTimePipe

  ],
  imports: [
    CommonModule,
    AthleteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSummernoteModule,
    NgSelectModule,
    DpDatePickerModule
  ]
})
export class AthleteModule { }
