import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaqService } from '@app/_services';
import { first } from 'rxjs/operators';
@Component({
    templateUrl: 'view.component.html',
    // styleUrls: ['add-edit.component.scss'] 
 })
export class FaqViewComponent implements OnInit{
    faq:any;
    _id: string;

    constructor(private route: ActivatedRoute, private faqservice: FaqService) {
        this.route.params.subscribe(params => this.faq = params._id);
    }

    ngOnInit() {
        this._id = this.route.snapshot.params['id'];
       this.faqservice.getFaqByID(this._id).pipe(first()).subscribe(
           faq => {this.faq = faq
        }
       )
    }

    
}