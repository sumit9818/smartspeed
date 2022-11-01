import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent, EditAccountComponent } from './account';
import { AskComponent } from './ask/ask.component';
import { DiaryComponent } from './diary/diary.component';
import { LayoutComponent } from './layout.component';
import { LeaderBoardComponent } from './leaderbord';
import { PackageComponent } from './package/package.component';
import { AthleteSubscriptionsComponent } from './payment/list.component';
import { ProgramsComponent, ViewAthleteProgramComponent } from './programs';
import { VideoAthletesComponent,ViewAthleteVideoComponent } from './video';

const routes: Routes = [{
  	path: '', component: LayoutComponent,
	children: [
		{path:'account' , component: AccountComponent},
		{path:'account/edit' , component: EditAccountComponent},
		{path:'ask' , component: AskComponent},
		{path:'programs' , component: ProgramsComponent},
		{path:'programs/:id', component: ViewAthleteProgramComponent},
		{path:'diary', component: DiaryComponent},
		{path:'video' , component: VideoAthletesComponent},
		{path:'video/:id', component: ViewAthleteVideoComponent},
		{path:'payment', component: AthleteSubscriptionsComponent},

		{path:'plan', component: PackageComponent},
		{path:'assessment', component: LeaderBoardComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AthleteRoutingModule { }
