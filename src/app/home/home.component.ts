import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AlertService, CoachService } from '@app/_services';
import { environment as env } from '@environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
// import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	filepath = `${env.imgUrl}`;
	iconpath = `${env.IconUrl}`;
	homepage: any;
	slides: any;
	logo: any;
	HomePageData: any;
	showinsta: any;
	testimonials: any;
	blogs: any;
	  
	  faqs:any;
	  pricing:any;
	  faqID:string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private accountService: AccountService,
		private alertService: AlertService,
		private modalService: NgbModal,
		private http: HttpClient,
		private CoachService: CoachService,
	) { }

	ngOnInit(): void {
		this.getHomePageContent();
	}

	viewfaq(id){
		
		Array.from(document.getElementsByClassName('accordion-item')).forEach(element => {
			element.classList.add('active')
		});

		document.getElementById(id).classList.remove('active');
		Array.from(document.getElementsByClassName('show')).forEach(element => {
			element.classList.remove('show')
		});
		Array.from(document.getElementsByClassName(id)).forEach(element => {
			element.classList.add('show')
		});
	}


	getHomePageContent() {
		this.http.get(`${env.apiUrl}/website/home`).pipe(first()).subscribe(
			homepage => {
				this.homepage = homepage;
				this.getLogo();

				for (let HomePageData of Object.values(this.homepage)) {
					this.HomePageData = HomePageData;
				}
				// this.showinsta = 'showinsta'
			})

		this.http.get(`${env.apiUrl}/homeimageslider/all`).pipe(first()).subscribe(
			slides => {
				this.slides = slides;
			})

		this.gettestimonial();
		this.getPlans();
		this.getFAQ();
		this.getBlogs();

		// setTimeout(() => {
		// 	$('#insta').append(`<div data-mc-src="f05ffeba-5a6c-41b7-8af5-7483cdd51296#instagram"></div>
		// 	<script  src="https://cdn2.woxo.tech/a.js#60096cbe44647b0015c0673c"  async data-usrc></script>`)
		// }, 3000);
	}

	gettestimonial() {
		this.http.get(`${env.apiUrl}/website/testimonial/all`).subscribe(
			res => {
				this.testimonials = res;
			}
		)
	}

	getLogo() {
		this.http.get(`${env.apiUrl}/website/logo`).subscribe(
			logo => this.logo = logo
		)
	}
	getPlans() {
        this.http.get(`${env.apiUrl}/website/pricing/all`).subscribe(
			pricing=>{
				this.pricing = pricing;
			}
		)
	}
	getFAQ() {
        this.http.get(`${env.apiUrl}/website/faq/all`).subscribe(
			res=>{
				this.faqs = res;
			}
		)
	}

	getBlogs() {
        this.http.get(`${env.apiUrl}/website/blog/all`).subscribe(
			res=>{
				this.blogs = res;
			}
		)
	}


	openSignUp(SignUPModal) {
		this.modalService.open(SignUPModal, { size: 'lg' });
	}

}
