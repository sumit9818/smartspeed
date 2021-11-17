import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule } from 'highcharts-angular';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';
import { HomeComponent } from './home/home.component';
import { HomeBlogsComponent } from './news/news.component';
import { ViewHomeBlogsComponent } from './news/view.component';
import { RegisterAthleteComponent } from './register/register.component';
import { NavbarComponent } from './_comman/navbar/navbar.component'
import { FooterComponent } from './_comman/footer/footer.component'

import { AdminRoutingModule } from './admin/admin-routing.module';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AthleteRoutingModule } from './athlete/athlete-routing.module';

import { OwlModule } from 'ng2-owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SafeHtmlPipe } from './safe-html';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule,
        NgbNavModule,
        HighchartsChartModule,
        FormsModule,
        AdminRoutingModule,
        AthleteRoutingModule,
        NgxSummernoteModule,
        OwlModule,
        CarouselModule
        
    ],
    declarations: [
        ScrollToBottomDirective,
        AppComponent,
        AlertComponent,
        HomeComponent,
        NavbarComponent,
        HomeBlogsComponent,
        ViewHomeBlogsComponent,
        RegisterAthleteComponent,
        FooterComponent,
        SafeHtmlPipe
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ],
})
export class AppModule { };
