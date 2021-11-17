import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAssessmentComponent, AssessmentComponent } from './assessment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { SportComponent, SportAddEditComponent } from './sports';
import { AddVideoComponent, VideoComponent, ViewVideoComponent } from './video-library';
import { AthleteComponent, AthleteAddEditComponent, ViewAthleteProgramsComponent, AthleteDetailsComponent } from './athlete';
import { ProgramComponent, ProgramAddEditComponent, ProgramViewComponent} from './program';
import { UserQueryComponent } from './query/query.component';
import { ChatComponent } from './chat/chat.component';
import { SubscriptionsComponent, SubscriptionsViewComponent, TransactionComponent } from './subscription';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SettingComponent } from './settings';
import { PricingAddEditComponent, PricingComponent } from './pricing';
import { BannerAddEditComponent, BannerComponent } from './pages/banner';
import { FAQComponent,FaqAddEditComponent,FaqViewComponent } from './pages/faq';
import { BlogAddEditComponent,BlogComponent,BlogViewComponent } from './pages/news';
import { TestimonialAddEditComponent, TestimonialComponent } from './pages/testimonial';

const routes: Routes = [{
	path: '', component: LayoutComponent,
	children: [
		{path:'', component:DashboardComponent},
		{path:'dashboard', component:DashboardComponent},
		// SPORTS
		{ path: 'sports', component: SportComponent },
		{ path: 'sports/add', component: SportAddEditComponent },
		{ path: 'sports/edit/:id/:name', component: SportAddEditComponent },

		// Video Library
		{ path: 'video-library', component: VideoComponent },
		{ path: 'video-library/view/:id', component: ViewVideoComponent },
		{ path: 'video-library/add', component: AddVideoComponent },
		{ path: 'video-library/edit/:id', component: AddVideoComponent },

		// Assessment
		{ path: 'assessment', component: AssessmentComponent },
		{ path: 'assessment/add', component: AddAssessmentComponent },
		{ path: 'assessment/edit/:id', component: AddAssessmentComponent },
		
		// Athlete
		{ path: 'athlete', component: AthleteComponent },
		{ path: 'athlete/add', component: AthleteAddEditComponent },
		{ path: 'athlete/edit/:id', component: AthleteAddEditComponent },
		{ path: 'athlete/program/:id', component: ViewAthleteProgramsComponent },
		{ path: 'athlete/view/:id', component: AthleteDetailsComponent },
		
		// Programs
		{ path: 'program', component: ProgramComponent },
		{ path: 'program/add', component: ProgramAddEditComponent },
		{ path: 'program/edit/:id', component: ProgramAddEditComponent },
		{ path: 'program/view/:id', component: ProgramViewComponent },
		
		{ path: 'query', component: UserQueryComponent },
		{ path: 'chat', component: ChatComponent },
		
		{ path: 'subscription', component: SubscriptionsComponent },
		{ path: 'subscription/view/:id', component: SubscriptionsViewComponent },
		{ path: 'subscription/transaction/:id', component: TransactionComponent},
		
		
		{ path: 'pages/homepage', component: HomepageComponent},
		{ path: 'pages/banner', component: BannerComponent},
		{ path: 'pages/banner/add/:id', component: BannerAddEditComponent},
		{ path: 'pages/banner/edit/:id', component: BannerAddEditComponent},

		{ path: 'settings', component: SettingComponent},
		{ path: 'pricing/add', component: PricingAddEditComponent},
		{ path: 'pricing/edit/:id', component: PricingAddEditComponent},
		{ path: 'pricing', component: PricingComponent},

		{ path: 'pages/faq', component: FAQComponent},
		{ path: 'pages/faq/add', component: FaqAddEditComponent},
		{ path: 'pages/faq/edit/:id', component: FaqAddEditComponent},
		{ path: 'pages/faq/:id', component: FaqViewComponent},
		{ path: 'pages/faq', component: FAQComponent},
		
		{ path: 'pages/testimonial', component: TestimonialComponent},
		{ path: 'pages/testimonial/add', component: TestimonialAddEditComponent},
		{ path: 'pages/testimonial/edit/:id', component: TestimonialAddEditComponent},

		{ path: 'pages/news', component: BlogComponent},
		{ path: 'pages/news/edit/:id', component: BlogAddEditComponent},
		{ path: 'pages/news/add/:id', component: BlogAddEditComponent},
		{ path: 'pages/news/:id', component: BlogViewComponent},
	]
	
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
