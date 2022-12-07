import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NgSelectModule } from '@ng-select/ng-select';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SportAddEditComponent, SportComponent } from './sports';
import { VideoComponent, ViewVideoComponent , AddVideoComponent } from './video-library';
import { FileComponent, VideoFileComponent } from './fileupload';
import { AssessmentComponent, AddAssessmentComponent } from './assessment';
import { AthleteComponent, AthleteAddEditComponent, ViewAthleteProgramsComponent, AthleteDetailsComponent } from './athlete';
import { ProgramComponent, ProgramAddEditComponent, ProgramViewComponent} from './program';
import { UserQueryComponent} from './query/query.component';
import { ChatComponent } from './chat/chat.component';
import { SubscriptionsComponent, SubscriptionsViewComponent, TransactionComponent } from './subscription';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BannerComponent, BannerAddEditComponent } from './pages/banner';
import { SettingComponent,SocialComponent,MetaTagsComponent } from './settings';
import { PricingAddEditComponent,PricingComponent } from './pricing';
import { AboutComponent } from './pages/about/about.component';
import { OfferComponent } from './pages/offer/offer.component';
import { FAQComponent,FaqAddEditComponent,FaqViewComponent } from './pages/faq';
import { TestimonialAddEditComponent,TestimonialComponent } from './pages/testimonial';
import { BlogAddEditComponent,BlogComponent,BlogViewComponent } from './pages/news';
import { ImageOneComponent,ImageTwoComponent,ImageThreeComponent,ImageFourComponent,ImageFiveComponent,ImageSixComponent,ImageSevenComponent, ImageNineComponent } from './pages/about/image';
import { DiffrentComponent,DiffrentFourComponent,DiffrentImageComponent,DiffrentOneComponent,DiffrentThreeComponent,DiffrentTwoComponent } from './pages/diffrent';
import { AdminTimePipe } from './admin.timezone.pipe'

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    SportComponent,
    SportAddEditComponent,
    VideoComponent, ViewVideoComponent , AddVideoComponent,
    FileComponent, VideoFileComponent, 
    AssessmentComponent, AddAssessmentComponent,
    AthleteComponent, AthleteAddEditComponent, ViewAthleteProgramsComponent, AthleteDetailsComponent, 
    ProgramComponent,ProgramAddEditComponent, ProgramViewComponent,
    UserQueryComponent,
    ChatComponent,
    SubscriptionsComponent, SubscriptionsViewComponent, TransactionComponent, HomepageComponent,
    SettingComponent,SocialComponent,MetaTagsComponent,
    PricingAddEditComponent,PricingComponent,
    BannerComponent, BannerAddEditComponent, AboutComponent, 
    OfferComponent,
    FAQComponent,FaqAddEditComponent,FaqViewComponent,
    BlogAddEditComponent,BlogComponent,BlogViewComponent,
    ImageOneComponent,ImageTwoComponent,ImageThreeComponent,ImageFourComponent,ImageFiveComponent,ImageSixComponent,ImageSevenComponent,ImageNineComponent,
    DiffrentComponent,DiffrentFourComponent,DiffrentImageComponent,DiffrentOneComponent,DiffrentThreeComponent,DiffrentTwoComponent,
    TestimonialAddEditComponent,TestimonialComponent,
    AdminTimePipe
  ],
  imports: [
		CommonModule,
		AdminRoutingModule,
		CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSummernoteModule,
    NgSelectModule
  ]
})
export class AdminModule { }
