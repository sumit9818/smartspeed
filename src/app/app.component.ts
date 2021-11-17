import {AfterViewInit, Component, Renderer2 } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { LoaderService } from '@app/_services/loader.service';
import { Router } from '@angular/router';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements AfterViewInit{
    user: User;

    constructor(
        private accountService: AccountService, 
        private loaderService: LoaderService,
		    private router: Router,
        private renderer: Renderer2) {
          
        this.accountService.user.subscribe(x => {this.user = x});
    }

    logout() {
        this.accountService.logout();
    }

    ngAfterViewInit() {
      
        this.loaderService.httpProgress().subscribe((status: boolean) => {
          if(this.router.url != '/admin/query' && this.router.url != '/admin/chat' ){
            if (status) {
              this.renderer.addClass(document.querySelector('.loader'), 'cursor-loader');
            } else {
              this.renderer.removeClass(document.querySelector('.loader'), 'cursor-loader');
            }
          }
          
         
        });
      }
}