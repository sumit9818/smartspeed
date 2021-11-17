import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, FaqService } from '@app/_services';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'faq.component.html',
    // styleUrls: ['add-edit.component.scss'] 
 })
export class FAQComponent implements OnInit{

    constructor(
        private route: ActivatedRoute, 
        private faqservice: FaqService, 
        private alertService:AlertService) {
    }

    faq:any;
    ngOnInit() {
        this.faqservice.getAllFaq().pipe(first()).subscribe(
            faq => {this.faq = faq}
        )
    }

    deleteFaq(_id): void {
        if (confirm("Are you sure you want to delete ?")){
           this.faqservice.deleteFaq(_id).subscribe(
            data => {
                this.alertService.success('Faq Deleted successfully', { keepAfterRouteChange: true });
                this.faqservice.getAllFaq()
                .pipe(first())
                .subscribe(faq => this.faq = faq);
            },
            error => {
                this.alertService.error(error);
            },
            );
            
        }
       
       }
  
}